import AxiosInstance from "./AxiosInstance";

export const deleteCustomer = async (id) => {
    try {
        const response = await AxiosInstance.delete(`/customers/${id}`);
        // Return response data if needed for further processing
        return response.data;
    } catch (error) {
        console.error("Error deleting customer:", error);
        // You can return or throw the error to handle it elsewhere
        throw error;
    }
};
