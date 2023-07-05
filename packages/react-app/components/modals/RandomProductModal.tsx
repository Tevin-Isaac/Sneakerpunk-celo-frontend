// This component is used to add a product to the marketplace and show the user's cUSD balance

// Importing the dependencies
import {useState } from "react";
import Image from "next/image";
import { useContractCall } from "@/hooks/contract/useContractRead";
import Product from "@/components/Product";

import ErrorAlert from "@/components/alerts/ErrorAlert";
import LoadingAlert from "@/components/alerts/LoadingAlert";
import SuccessAlert from "@/components/alerts/SuccessAlert";
// Define the RandomProduct component
const RandomProductModal = () => {
  // Use the useContractCall hook to read how many products are in the marketplace contract
  const { data } = useContractCall("getProductsLength", [], true);
  // Convert the data to a number
  const productLength = data ? Number(data.toString()) : 0;

  // The visible state is used to toggle the visibility of the modal
  const [visible, setVisible] = useState(false);

  // Define the states to store the error, success and loading messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");

  const [showProduct, setShowProduct] = useState(false);
  const [productId, setProductId] = useState(0)
  const [loadingMessage, setLoadingMessage] = useState("Please wait ...")
  
  // Define a function to clear the error, success and loading states
  const clear = () => {
    setError("");
    setSuccess("");
    setLoading("");
  };

  const loadingRandom = async () => {
    setShowProduct(false)
    if (productLength == 0) {
      setLoadingMessage("***Please add product to use random function")
    } else {
      // loading 2 seconds
      let timer = setTimeout(() => setShowProduct(true), 2 * 1000);
      setProductId(Math.floor(Math.random() * productLength))

      return () => {
        clearTimeout(timer);
      };
    }
  }

  // Define the JSX that will be rendered
  return (
    <div className={"flex flex-row w-full justify-between"}>
      <div>
        {/* Add Random button that opens the modal */}
        <button
          type="button"
          onClick={() => { 
              setVisible(true) 
              loadingRandom()
            }
          }
          className="inline-block ml-4 px-6 py-2.5 mt-8 bg-black text-white font-medium text-md leading-tight rounded-2xl shadow-md hover:bg-yellow-300 hover:shadow-lg focus:bg-yellow-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-300 active:shadow-lg transition duration-150 ease-in-out"
          data-bs-toggle="modal"
          data-bs-target="#exampleModalCenter"
        >
          Shuffle Sneakers
        </button>
     
        {/* Modal */}
        {visible && (
          <div
            className="fixed z-40 top-0 w-full left-0"
            id="modal"
          >
            <form>
              <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                  <div className="absolute inset-0 bg-gray-900 opacity-75" />
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
                  &#8203;
                </span>
                <div
                  className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                >
                  <div className="bg-purple-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    {!showProduct ?
                      <div className="text-center">
                        <Image className="block w-full sm:block lg:block" src="/randomImg.gif" width="32" height="32" alt="random image"/>
                        <span>{loadingMessage}</span>
                      </div> :
                      <Product
                        id={productId}
                        setSuccess={setSuccess}
                        setError={setError}
                        setLoading={setLoading}
                        loading={loading}
                        clear={clear}
                        imgHeight="h-40"
                        descHeight="h-20"
                        editdelete={false}
                      /> 
                    }
                  </div>
                  <div className="bg-gray-200 px-4 py-3 text-right">
                    {/* Button to close the modal */}
                    <button
                      type="button"
                      className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                      onClick={() => setVisible(false)}
                    >
                      <i className="fas fa-times"></i> Cancel
                    </button>
                    {/* Button to random product */}
                    <button
                      type="button"
                      className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
                      onClick={() => loadingRandom()}
                    >
                      Choose again
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      {error && <ErrorAlert message={error} clear={clear} />}
      {success && <SuccessAlert message={success} />}
      {loading && <LoadingAlert message={loading} />}
      </div>
    </div>
  );
};

export default RandomProductModal;