import React from "react";

const EmptyState = ()=>{
    return(
        <div className="w-full flex items-center flex-wrap justify-center mt-5">
            <div className="grid gap-4 w-60">
                <div className="w-20 h-20 mx-auto bg-gray-50 rounded-full shadow-sm justify-center items-center inline-flex">
                    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32" fill="none">
                        <g id="File Serch">
                            <path id="Vector" d="M19.9762 4V8C19.9762 8.61954 19.9762 8.92931 20.0274 9.18691C20.2379 10.2447 21.0648 11.0717 22.1226 11.2821C22.3802 11.3333 22.69 11.3333 23.3095 11.3333H27.3095M18.6429 19.3333L20.6429 21.3333M19.3095 28H13.9762C10.205 28 8.31934 28 7.14777 26.8284C5.9762 25.6569 5.9762 23.7712 5.9762 20V12C5.9762 8.22876 5.9762 6.34315 7.14777 5.17157C8.31934 4 10.205 4 13.9762 4H19.5812C20.0324 4 20.258 4 20.4603 4.05573C20.6405 4.1054 20.8095 4.18666 20.9604 4.29531C21.131 4.41859 21.2706 4.58559 21.5497 4.91959L27.1457 11.4196C27.4248 11.7536 27.5643 11.9206 27.6876 12.0931C27.7962 12.241 27.8774 12.41 27.9271 12.5902C27.9829 12.7925 27.9829 13.0181 27.9829 13.4693V20C27.9829 23.7712 27.9829 25.6569 26.8113 26.8284C25.6397 28 23.7541 28 19.9829 28H19.3095ZM12.6429 15.3333H20.6429H12.6429ZM12.6429 20H17.3095H12.6429Z" stroke="#E1E2E2" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                    </svg>
                </div>
                <div className="text-neutral-300 text-sm font-light text-center">No transactions</div>
                <button class="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6  mr-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Add Transaction
                </button>
            </div>
        </div>

    )
}
export default EmptyState