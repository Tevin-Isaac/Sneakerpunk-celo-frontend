// Importing the dependencies
import { useState } from "react";
// import ethers to convert the product price to wei
import { ethers } from "ethers";
// Import the toast library to display notifications
import { toast } from "react-toastify";
// Import the useDebounce hook to debounce the input fields
import { useDebounce } from "use-debounce";
// Import our custom useContractSend hook to edit a product to the marketplace contract
import { useContractSend } from "@/hooks/contract/useContractWrite";
// Import the erc20 contract abi to get the cUSD balance
import { PencilIcon } from "@heroicons/react/24/outline";

// Define the AddProductModal component
interface Product {
  id: number;
  product: {
    name: string;
    price: number;
    owner: string;
    image: string;
    description: string;
    location: string;
    sold: boolean;
  };
}

const EditProductModal = ({ id, product }: Product) => {
  // The visible state is used to toggle the visibility of the modal
  const [visible, setVisible] = useState(false);
  // The following states are used to store the values of the input fields
  const [productName, setProductName] = useState(product.name);
  const [productPrice, setProductPrice] = useState<string | number>(
    product.price / 10 ** 18
  );
  const [productImage, setProductImage] = useState(product.image);
  const [productDescription, setProductDescription] = useState(
    product.description
  );
  const [productLocation, setProductLocation] = useState(product.location);

  // The following states are used to debounce the input fields
  const [debouncedProductName] = useDebounce(productName, 500);
  const [debouncedProductPrice] = useDebounce(productPrice, 500);
  const [debouncedProductImage] = useDebounce(productImage, 500);
  const [debouncedProductDescription] = useDebounce(productDescription, 500);
  const [debouncedProductLocation] = useDebounce(productLocation, 500);
  const [loading, setLoading] = useState("");

  // Check if all the input fields are filled
  const isComplete =
    productName &&
    productPrice &&
    productImage &&
    productLocation &&
    productDescription;

  // Convert the product price to wei
  const productPriceInWei = ethers.utils.parseEther(
    debouncedProductPrice.toString()
  );

  // Use the useContractSend hook to use our editProduct function on the marketplace contract and add a product to the marketplace
  const { writeAsync: editProductFunc } = useContractSend("editProduct", [
    id,
    debouncedProductName,
    debouncedProductImage,
    debouncedProductDescription,
    debouncedProductLocation,
    productPriceInWei,
  ]);

  // Define function that handles the creation of a product through the marketplace contract
  const handleEditProduct = async () => {
    if (!editProductFunc) {
      throw "Failed to edit product";
    }
    setLoading("Editing...");
    if (!isComplete) throw new Error("Please fill all fields");
    // Edit the product by calling the editProduct function on the marketplace contract
    const purchaseTx = await editProductFunc();
    setLoading("Waiting for confirmation...");
    // Wait for the transaction to be mined
    await purchaseTx.wait();
    // Close the modal and clear the input fields after the product is added to the marketplace
    setVisible(false);
  };

  // Define function that handles the editing of a product, if a user submits the product form
  const editProduct = async (e: any) => {
    e.preventDefault();
    try {
      // Display a notification while the product is being added to the marketplace
      await toast.promise(handleEditProduct(), {
        pending: "Editing product...",
        success: "Product edited successfully",
        error: "Something went wrong. Try again.",
      });
      // Display an error message if something goes wrong
    } catch (e: any) {
      console.log({ e });
      toast.error(e?.message);
      // Clear the loading state after the product is added to the marketplace
    } finally {
      setLoading("");
    }
  };

  // Define the JSX that will be rendered
  return (
    <div>
    {/* Add Product Button that opens the modal */}
    <button
        type="button"
        onClick={() => setVisible(true)}
        className="inline-block p-1 bg-white text-black font-medium text-md leading-tight rounded-[4px] shadow-md border border-black"
        product-bs-toggle="modal"
        product-bs-target="#exampleModalCenter"
    >
        <PencilIcon className="block h-4 w-4" aria-hidden="true" />
    </button>

    {/* Modal */}
    {visible && (
        <div
        className="fixed z-40 overflow-y-auto top-0 w-full left-0"
        id="modal"
        >
        {/* Form with input fields for the product, that triggers the editProduct function on submit */}
        <form onSubmit={editProduct}>
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
                {/* Input fields for the product */}
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <label>Product Name</label>
                <input
                    onChange={(e) => {
                    setProductName(e.target.value);
                    }}
                    value={productName}
                    required
                    type="text"
                    className="w-full bg-gray-100 p-2 mt-2 mb-3"
                />

                <label>Product Image (URL)</label>
                <input
                    onChange={(e) => {
                    setProductImage(e.target.value);
                    }}
                    required
                    value={productImage}
                    type="text"
                    className="w-full bg-gray-100 p-2 mt-2 mb-3"
                />

                <label>Product Description</label>
                <input
                    onChange={(e) => {
                    setProductDescription(e.target.value);
                    }}
                    required
                    value={productDescription}
                    type="text"
                    className="w-full bg-gray-100 p-2 mt-2 mb-3"
                />

                <label>Product Location</label>
                <input
                    onChange={(e) => {
                    setProductLocation(e.target.value);
                    }}
                    required
                    type="text"
                    value={productLocation}
                    className="w-full bg-gray-100 p-2 mt-2 mb-3"
                />

                <label>Product Price (cUSD)</label>
                <input
                    onChange={(e) => {
                    setProductPrice(e.target.value);
                    }}
                    required
                    type="number"
                    value={productPrice}
                    className="w-full bg-gray-100 p-2 mt-2 mb-3"
                />
                </div>
                {/* Button to close the modal */}
                <div className="bg-gray-200 px-4 py-3 text-right">
                <button
                    type="button"
                    className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                    onClick={() => setVisible(false)}
                >
                    <i className="fas fa-times"></i> Cancel
                </button>
                {/* Button to add the product to the marketplace */}
                <button
                    type="submit"
                    disabled={!!loading || !isComplete || !editProduct}
                    className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
                >
                    {loading ? loading : "Edit"}
                </button>
                </div>
            </div>
            </div>
        </form>
        </div>
    )}
    </div>
  );
};

export default EditProductModal;