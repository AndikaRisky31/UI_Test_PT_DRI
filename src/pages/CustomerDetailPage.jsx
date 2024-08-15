import React, { useEffect, useState } from "react";
import useCustomerStore from '../stores/useCustomerStore';
import AxiosInstance from "../api/AxiosInstance";
import { formatNumber } from "../utils/numberFormatter";
import { Oval } from 'react-loader-spinner';
import { BookSaved, Edit2 } from "iconsax-react";

const CustomerDetailPage = ({ onUpdate }) => {
    const selectedCustomerId = useCustomerStore((state) => state.selectedCustomerId);
    const [isLoadingDetails, setIsLoadingDetails] = useState(true);
    const [customerDetail, setCustomerDetail] = useState(null);
    const [editingQuantity, setEditingQuantity] = useState(null);
    const [newQuantity, setNewQuantity] = useState(null);

    const getDetailsCustomer = async (id) => {
        setIsLoadingDetails(true);
        try {
            const response = await AxiosInstance.get(`customers/${id}`);
            setCustomerDetail(response.data);
        } catch (error) {
            console.error("Error fetching customer data:", error);
        } finally {
            setIsLoadingDetails(false);
        }
    };

    const handleEditQuantity = (item) => {
        setEditingQuantity(item.id);
        setNewQuantity(item.quantity);
    };

    useEffect(() => {
        if (selectedCustomerId) {
            getDetailsCustomer(selectedCustomerId);
        }
    }, [selectedCustomerId]);

    const handleSaveQuantity = async (item) => {
        try {
            // Update quantity on the server
            await AxiosInstance.put(`customers/${selectedCustomerId}/orders/${item.product_id}`, {
                quantity: newQuantity,
            });

            // Refresh customer details to ensure the latest data
            await getDetailsCustomer(selectedCustomerId);

            // Call onUpdate to notify CustomerPage to refresh
            onUpdate();

            setEditingQuantity(null);
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    return (
        <>
            <div className={`${selectedCustomerId ? 'lg:w-2/6' : 'lg:w-1/6'} font-quicksand`}>
                {selectedCustomerId ? (
                    isLoadingDetails ? (
                        <div className="flex justify-center items-center h-full">
                            <Oval
                                visible={true}
                                height="40"
                                width="40"
                                color="#6366F1"
                                ariaLabel="oval-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                        </div>
                    ) : (
                        <>
                            <div className="bg-white w-full shadow overflow-hidden sm:rounded-lg">
                                <div className="px-4 py-5 sm:px-6">
                                    <h3 className="text-xl font-bold font-quicksand leading-loose text-gray-900">
                                        Customer Details
                                    </h3>
                                </div>
                                <div className="border-t border-gray-200">
                                    <dl>
                                        <div className="bg-zinc-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">
                                                Name
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                                                {customerDetail.customer.name}
                                            </dd>
                                        </div>
                                        <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">
                                                Level
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                                                {customerDetail.customer.level}
                                            </dd>
                                        </div>
                                        <div className="bg-zinc-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500 ">
                                                Favorite Menu
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                                                {customerDetail.customer.favorite_menu}
                                            </dd>
                                        </div>
                                        <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">
                                                Total Transaction
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                                                Rp. {formatNumber(customerDetail.totalTransaction, "ID-id")}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                            <table className="w-full table-auto bg-white my-5">
                                <thead className="hidden md:table-row-group bg-zinc-50 rounded-t-lg">
                                    <tr>
                                        {['Name Product', 'Quantity', 'Price', 'Action'].map((label, index) => (
                                            <th key={index} className="text-neutral-400 text-sm font-medium font-quicksand py-2.5 px-4 text-center">
                                                <div className="flex items-center justify-between">
                                                    {label}
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {customerDetail && customerDetail.orders.length > 0 && customerDetail.orders.map((item) => (
                                        <tr className="h-12" key={item.id}>
                                            <td className="text-neutral-900 text-sm font-semibold font-quicksand py-2.5 px-4 capitalize">
                                                {item.name}
                                            </td>
                                            <td className="text-neutral-900 text-sm font-semibold font-quicksand py-2.5 px-4 capitalize">
                                                {editingQuantity === item.id ? (
                                                    <input
                                                        type="number"
                                                        value={newQuantity}
                                                        onChange={(e) => setNewQuantity(e.target.value)}
                                                        className="w-20 p-1 border rounded"
                                                    />
                                                ) : (
                                                    item.quantity
                                                )}
                                            </td>
                                            <td className="text-neutral-900 text-sm font-semibold font-quicksand py-2.5 px-4 capitalize">
                                                Rp. {formatNumber(item.price, 'id-ID')}
                                            </td>
                                            <td className="py-2.5 px-4">
                                                <div className="flex items-center gap-2">
                                                    {editingQuantity === item.id ? (
                                                        <button
                                                            className="flex items-center px-3 py-3 bg-zinc-50 rounded hover:bg-zinc-200"
                                                            onClick={() => handleSaveQuantity(item)}
                                                        >
                                                            <BookSaved color="#292D32" size={12} />
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="flex items-center px-3 py-3 bg-zinc-50 rounded hover:bg-zinc-200"
                                                            onClick={() => handleEditQuantity(item)}
                                                        >
                                                            <Edit2 color="#292D32" size={12} />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )
                ) : (
                    <div className="h-full flex flex-col">
                        <div className="relative bg-indigo-500 row-span-2 overflow-hidden rounded-md p-5">
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
                )}
            </div>
        </>
    );
};

export default CustomerDetailPage;