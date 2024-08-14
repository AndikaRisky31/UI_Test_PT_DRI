import React, { useEffect, useState } from "react";
import { Add, ArrowRight, ArrowSwapVertical, Edit2, Filter, Printer, Refresh2, SearchNormal, ShieldSearch, Trash } from "iconsax-react";
import AxiosInstance from "../api/AxiosInstance";
import { formatNumber } from "../utils/numberFormatter";
import { deleteCustomer } from "../api/HandleCustomers";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getColorClasses } from "../utils/helper";



const CustomerPage = ()=>{
    const MySwal = withReactContent(Swal)
    const [dataCustomer, setDataCustomer] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [sortBy, setSortBy] = useState('name');
    const [order, setOrder] = useState('asc');
    const limit = 10; 

    const getListDataCustomer = async (page, limit, sortBy, order) => {
        try {
            const response = await AxiosInstance.get(`customers?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`);
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


    useEffect(() => {
        const fetchData = async () => {
            const data = await getListDataCustomer(page, limit);
            setTotalPages(data.total_pages)
            setDataCustomer(data.customers);
        };
        fetchData();
    }, [page]);

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
        <div className="w-full flex flex-grow pt-3 gap-4 ">
            <div className="w-full h-auto lg:w-5/6 flex flex-col gap-4">
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
                        <button className="flex items-center gap-3 px-4 py-2 bg-white/20 rounded-lg text-white text-sm font-semibold font-quicksand leading-tight">
                            <Add color="#FFFFFF" size={20} />
                            Add New Customer
                        </button>
                        <div className="flex-auto w-full lg:w-96 h-full relative flex items-center py-0.5">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <SearchNormal color="#D1D0D3" size={16} />
                            </div>
                            <input
                                type="search"
                                id="search"
                                className="w-full h-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white"
                                placeholder="Search Customer"
                                required
                            />
                            <button
                                type="submit"
                                className="py-2 absolute right-1 text-white text-sm font-semibold font-quicksand leading-tight bg-indigo-500 hover:bg-indigo-800 rounded-lg px-4"
                            >
                                Search
                            </button>
                        </div>
                        <button className="flex items-center gap-3 px-4 py-2 bg-white/20 rounded-lg text-white text-sm font-semibold font-quicksand leading-tight">
                            <Filter color="#FFFFFF" size={16} />
                            Filter
                        </button>
                        <button className="flex items-center gap-3 px-4 py-2 bg-white/20 rounded-lg text-white text-sm font-semibold font-quicksand leading-tight">
                            <Refresh2 color="#FFFFFF" size={16} />
                            Refresh
                        </button>
                        <button className="flex items-center gap-3 px-4 py-2 bg-white/20 rounded-lg text-white text-sm font-semibold font-quicksand leading-tight">
                            <Printer color="#FFFFFF" size={16} />
                        </button>
                    </div>
                </div>
                <div className="w-full">
                    <table className="w-full table-auto bg-white">
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
                                                <button className="flex items-center gap-2 px-3 py-2 bg-zinc-50 rounded hover:bg-zinc-200">
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
                                className={`self-stretch px-4 py-2 bg-white rounded shadow flex-col justify-center items-center inline-flex cursor-pointer ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={handlePreviousPage}
                            >
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
                                className={`self-stretch px-4 py-2 bg-white rounded shadow flex justify-center items-center gap-3 cursor-pointer ${page === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={handleNextPage}
                            >
                                <div className="text-center text-neutral-500 text-sm font-semibold font-['Quicksand'] leading-tight">
                                    Next
                                </div>
                                <ArrowRight color="#6D6D6D" size={16}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-1/6 hidden md:block flex-col h-full content-between font-quicksand">
                <div className="p-5 relative bg-indigo-500 row-span-2 overflow-hidden rounded-md">
                    <div className="w-full text-white text-xl font-semibold font-quicksand leading-loose">See analytics of the Customer Clearly</div>
                    <button className="mt-10 z-40 h-11 px-4 py-2 bg-white/20 rounded-lg justify-center items-center gap-3 inline-flex text-white text-sm font-semibold font-quic leading-tight">
                        See Analytics
                    </button>
                    <div className="w-80 h-80 z-10 left-[84px] top-[106px] absolute bg-indigo-500 rounded-full border border-indigo-300" />
                    <div className="w-80 h-80 z-20 left-[126px] top-[136px] absolute bg-indigo-400 rounded-full border border-white" />
                    <div className="w-80 h-80 z-30 left-[168px] top-[166px] absolute bg-indigo-300 rounded-full border border-zinc-100" />
                </div>
                <div className="w-full bg-neutral-50 rounded-lg p-5 overflow-hidden mt-4">
                    <div className="flex flex-col">
                        <span className="text-neutral-900 text-2xl font-medium font-quicksand leading-7">Top Menu</span>
                        <span className="text-orange-500 text-2xl font-bold font-quicksand leading-7">This Week</span>
                    </div>
                    <div className="my-2 text-neutral-400 text-xs font-medium font-['Satoshi Variable'] leading-normal tracking-tight">
                        10 - 12 Agustus 2023
                    </div>

                    <div className="relative p-2.5 bg-white rounded-lg shadow flex items-center">
                        <div className="flex-grow text-black text-sm font-bold font-quicksand leading-tight">
                            Nasi Goreng Jamur Special Resto Pak Min
                        </div>
                        <div className="absolute h-6 px-2 rotate-[8deg] -top-3 -right-2 bg-orange-500 shadow flex items-center justify-center">
                            <div className="rotate-[5deg] text-white text-sm font-bold font-quicksand leading-tight">1</div>
                        </div>
                    </div>

                    {['Tongseng Sapi Gurih', 'Nasi Gudeg Telur Ceker', 'Nasi Ayam Serundeng', 'Nasi Goreng Seafood'].map((menu, index) => (
                        <div key={index} className="w-full p-2.5 mt-2 flex items-center">
                            <div className="flex-grow text-neutral-400 text-xs font-semibold font-quicksand leading-none">
                                {index + 2}. {menu}
                            </div>
                        </div>
                    ))}

                    <svg width="227" height="228" viewBox="0 0 227 228" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M-2.94362 150.026L-5.91148 152.676L-5.91148 229.709L233.741 229.709L233.741 1.00004L232.249 13.6106C230.757 26.2211 227.772 51.4421 220.83 49.9454C213.887 48.4487 202.985 20.2343 196.822 23.997C190.658 27.7597 189.232 63.4994 185.127 81.1592C181.023 98.819 174.239 98.3989 165.562 85.1992C156.885 71.9995 146.315 46.0203 138.513 38.7263C130.712 31.4322 125.678 42.8232 120.56 53.644C115.442 64.4647 110.24 74.7153 103.722 76.0856C97.2035 77.4559 89.3697 69.9461 84.5656 82.8855C79.7616 95.8249 77.9873 129.214 73.164 142.023C68.3407 154.833 60.4684 147.063 53.9485 148.421C47.4285 149.779 42.2609 160.265 35.4775 159.845C28.6941 159.425 20.2949 148.098 13.1274 145.086C5.95994 142.074 0.0242315 147.375 -2.94362 150.026Z" fill="url(#paint0_linear_1_565)" stroke="#F17300"/>
                        <defs>
                            <linearGradient id="paint0_linear_1_565" x1="97" y1="-309.5" x2="97" y2="180" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#F17300"/>
                                <stop offset="1" stopColor="#F17300" stopOpacity="0"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

            </div>
        </div>
    )
}

export default CustomerPage;