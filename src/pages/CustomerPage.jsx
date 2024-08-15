import React, { useEffect, useState } from "react";
import { Add, ArrowLeft, ArrowRight, ArrowSwapVertical, Edit2, Filter, Printer, Refresh2, SearchNormal, ShieldSearch, Trash } from "iconsax-react";
import AxiosInstance from "../api/AxiosInstance";
import { formatNumber } from "../utils/numberFormatter";
import { deleteCustomer } from "../api/HandleCustomers";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getColorClasses } from "../utils/helper";
import { Oval } from 'react-loader-spinner'
import CustomerDetailPage from "./CustomerDetailPage";
import useCustomerStore from "../stores/useCustomerStore";
import AddCustomer from "./AddCustomer";

const CustomerPage = ()=>{
    const setSelectedCustomerId = useCustomerStore((state) => state.setSelectedCustomerId);
    const selectedCustomerId = useCustomerStore((state) => state.selectedCustomerId);
    const [isAddCustomer, setIsAddCustomer] = useState(false);
    const MySwal = withReactContent(Swal)
    const [dataCustomer, setDataCustomer] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [sortBy, setSortBy] = useState('name');
    const [order, setOrder] = useState('asc');
    const [isLoading, setIsLoading] = useState(true);
    const limit = 10; 
    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const [searchQuery, setSearchQuery] = useState(""); // State untuk menyimpan query pencarian

    const handleSearch = async () => {
        try {
            setIsLoading(true);
            const response = await AxiosInstance.get(`/customers/search`, {
                params: {
                  page,
                  limit,
                  sortBy,
                  order,
                  name:searchQuery
                },
              });
            console.log(response.data);
            setIsLoading(false);
            setDataCustomer(response.data.customers);
            setTotalPages(response.data.total_pages);
        } catch (error) {
            console.error("Error searching customers:", error);
            setIsLoading(false);
        }
    };


    const getListDataCustomer = async (page, limit, sortBy, order) => {
        try {
            setIsLoading(true)
            const response = await AxiosInstance.get(`customers?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`);
            setIsLoading(false)
            return response.data;
        } catch (error) {
            console.error("Error fetching customer data:", error);
            return [];
        }
    };

    const handleSort = (newSortBy) => {
        const newOrder = sortBy === newSortBy && order === 'asc' ? 'desc' : 'asc'; // Toggle order if sorting by same column
        setSortBy(newSortBy);
        setOrder(newOrder);
    
        getListDataCustomer(page, limit, newSortBy, newOrder).then(data => {
            setDataCustomer(data.customers);
            setTotalPages(data.total_pages);
        });
    };

    const handleClickDetail = (id) =>{
        setSelectedCustomerId(id)
        setIsAddCustomer(false)
    }


    
    const handleDeleteCustomer = (item) => {
        MySwal.fire({
            title: `Are you sure to delete ${item.name}?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteCustomer(item.id);
                    Swal.fire({
                        title: "Deleted!",
                        text: `Customer ${item.name} has been deleted.`,
                        icon: "success"
                    });
                    // Fetch the updated list of customers after deletion
                    const data = await getListDataCustomer(page, limit);
                    setTotalPages(data.total_pages);
                    setDataCustomer(data.customers);
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                        footer: '<a href="#">Why do I have this issue?</a>'
                      });
                }
                
            }
        });
    };


    const refresh = async () => {
        const data = await getListDataCustomer(page, limit);
        setTotalPages(data.total_pages)
        setDataCustomer(data.customers);
    };


    useEffect(() => {
        refresh();
    }, [page,refreshTrigger]);

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return(
        <div className="w-full flex flex-grow flex-col md:flex-row pt-3 gap-4 ">
            <div className={`w-full ${selectedCustomerId ? 'lg:w-4/6' : 'lg:w-5/6' } flex flex-col gap-4`}>
                <div className="w-full bg-indigo-500 rounded-lg p-5">
                    <div className="w-full flex flex-col lg:flex-row gap-4">
                        <div className="flex-grow flex flex-col gap-1">
                            <div className="text-white text-xl font-bold font-quicksand leading-loose">Customer</div>
                            <div className="text-cyan-50 text-xs font-medium font-['Satoshi Variable'] leading-normal tracking-tight">
                                On this menu you will be able to create, edit, and also delete the customer. Also you can manage it easily.
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center gap-4">
                        <button onClick={()=> setIsAddCustomer(true)} className="flex items-center gap-3 px-4 py-2 bg-white/20 rounded-lg text-white text-sm font-semibold font-quicksand leading-tight hover:bg-white/50">
                            <Add color="#FFFFFF" size={20} />
                            Add New Customer
                        </button>
                        <div className="flex-auto w-full lg:w-96 relative flex items-center py-0.5">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <SearchNormal color="#D1D0D3" size={16} />
                            </div>
                            <input
                                type="search"
                                id="search"
                                className="w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white"
                                placeholder="Search Customer"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)} // Update state saat input berubah
                            />
                            <button
                                onClick={handleSearch}
                                type="submit"
                                className="py-2 absolute right-1 text-white text-sm font-semibold font-quicksand leading-tight bg-indigo-500 hover:bg-indigo-800 rounded-lg px-4 transition-colors"
                            >
                                Search
                            </button>
                        </div>
                        <button className="flex items-center gap-3 px-4 py-2 bg-white/20 rounded-lg text-white text-sm font-semibold font-quicksand leading-tight hover:bg-white/50">
                            <Filter color="#FFFFFF" size={16} />
                            Filter
                        </button>
                        <button className="flex items-center gap-3 px-4 py-2 bg-white/20 rounded-lg text-white text-sm font-semibold font-quicksand leading-tight hover:bg-white/50" onClick={refresh}>
                            <Refresh2 color="#FFFFFF" size={16} />
                            Refresh
                        </button>
                        <button className="flex items-center gap-3 px-4 py-2 bg-white/20 rounded-lg text-white text-sm font-semibold font-quicksand leading-tight hover:bg-white/50">
                            <Printer color="#FFFFFF" size={16} />
                        </button>
                    </div>
                </div>
                {
                    isLoading ? (
                        <div className="flex justify-center items-center h-full">
                            <Oval
                                visible={true}
                                height="80"
                                width="80"
                                color="#6366F1"
                                ariaLabel="oval-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                        </div>
                    ) : (
                        <div className="w-full">
                            <table className="w-full bg-white">
                                <thead className="hidden md:table-row-group bg-zinc-50 rounded-t-lg">
                                    <tr>
                                        {['Customer Name', 'Level', 'Favorite Menu', 'Total Transaction', 'Action'].map((label, index) => (
                                            <th key={index} className="text-neutral-400 text-sm font-medium font-quicksand py-2.5 px-4 text-center">
                                                <div className="flex items-center justify-between">
                                                    {label}
                                                    {label !== 'Action' && (
                                                        <ArrowSwapVertical
                                                            color={
                                                                sortBy === (label === 'Customer Name' ? 'name' :
                                                                            label === 'Level' ? 'level' :
                                                                            label === 'Favorite Menu' ? 'favorite_menu' : 'total_transaction')
                                                                    ? '#6366f1'
                                                                    : '#a3a3a3'
                                                            }
                                                            size={16}
                                                            className="cursor-pointer"
                                                            onClick={() => handleSort(
                                                                label === 'Customer Name' ? 'name' :
                                                                label === 'Level' ? 'level' :
                                                                label === 'Favorite Menu' ? 'favorite_menu' : 'total_transaction'
                                                            )}
                                                        />
                                                    )}
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataCustomer && dataCustomer.map((item) => {
                                        const { bgColor, textColor } = getColorClasses(item.level);
                                        return (
                                            <tr className="h-12" key={item.id}>
                                                <td className="text-neutral-900 text-sm font-semibold font-quicksand py-2.5 px-4">
                                                    {item.name}
                                                </td>
                                                <td className="py-2.5 px-4">
                                                    <div className={`px-6 py-2 ${bgColor} rounded inline-flex items-center`}>
                                                        <span className={`${textColor} text-sm font-semibold font-quicksand leading-tight capitalize`}>{item.level}</span>
                                                    </div>
                                                </td>
                                                <td className="text-neutral-900 text-sm font-semibold font-quicksand py-2.5 px-4">
                                                    {item.favorite_menu}
                                                </td>
                                                <td className="text-neutral-900 text-sm font-semibold font-quicksand py-2.5 px-4">
                                                    Rp. {formatNumber(item.total_transaction, 'id-ID')}
                                                </td>
                                                <td className="py-2.5 px-4">
                                                    <div className="flex items-center gap-2">
                                                        <button className="flex items-center gap-2 px-3 py-2 bg-zinc-50 rounded hover:bg-zinc-200" onClick={()=>handleClickDetail(item.id)}>
                                                            <ShieldSearch color="#292D32" size={12} />
                                                            <span className="text-neutral-900 text-sm font-semibold font-quicksand leading-tight">Detail</span>
                                                        </button>
                                                        <button className="flex items-center px-3 py-3 bg-zinc-50 rounded hover:bg-zinc-200">
                                                            <Edit2 color="#292D32" size={12} />
                                                        </button>
                                                        <button className="flex items-center px-3 py-3 bg-zinc-50 rounded hover:bg-zinc-200" onClick={() => handleDeleteCustomer(item)}>
                                                            <Trash color="#F02D3A" size={12} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    
                                </tbody>
                            </table>
                            <div className="w-full h-12 px-3 py-2 mt-auto bg-neutral-50 rounded-lg justify-start items-center inline-flex">
                                <div className="grow shrink basis-0 text-neutral-400 text-base font-semibold font-['Quicksand'] leading-normal">
                                    Showing 10 Data Customers (Page {page} of {totalPages})
                                </div>
                                <div className="self-stretch justify-center items-center flex gap-2">
                                    <div
                                        className={`self-stretch px-4 py-2 bg-white hover:bg-zinc-100 rounded shadow flex justify-center items-center gap-3 cursor-pointer ${page === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        onClick={handlePreviousPage}
                                    >
                                        <ArrowLeft color="#6D6D6D" size={16}/>
                                        <div className="text-center text-neutral-500 text-sm font-semibold font-['Quicksand'] leading-tight">
                                            Previous
                                        </div>
                                    </div>
                                    <div className="self-stretch px-4 py-2 bg-white rounded shadow flex-col justify-center items-center inline-flex">
                                        <div className="text-center text-neutral-900 text-sm font-bold font-['Quicksand'] leading-tight">
                                            {page}
                                        </div>
                                    </div>
                                    {page < totalPages && (
                                        <div className="w-10 self-stretch px-4 py-2 flex-col justify-center items-center inline-flex">
                                            <div className="text-center text-neutral-500 text-sm font-semibold font-['Quicksand'] leading-tight">
                                                {page + 1}
                                            </div>
                                        </div>
                                    )}
                                    {page < totalPages - 1 && (
                                        <div className="w-10 self-stretch px-4 py-2 flex-col justify-center items-center inline-flex">
                                            <div className="text-center text-neutral-500 text-sm font-semibold font-['Quicksand'] leading-tight">
                                                ...
                                            </div>
                                        </div>
                                    )}
                                    <div
                                        className={`self-stretch px-4 py-2 bg-white hover:bg-zinc-100 rounded shadow flex justify-center items-center gap-3 cursor-pointer ${page === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        onClick={handleNextPage}
                                    >
                                        <div className="text-center text-neutral-500  text-sm font-semibold font-['Quicksand'] leading-tight">
                                            Next
                                        </div>
                                        <ArrowRight color="#6D6D6D" size={16}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            {
                isAddCustomer ? (
                    <AddCustomer onUpdate={() => setRefreshTrigger(prev => !prev)}  />
                ):(
                    <CustomerDetailPage onUpdate={() => setRefreshTrigger(prev => !prev)} />
                )
            }
        </div>
    )
}

export default CustomerPage;