"use client";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { Category } from "@/types/product";
import { gql, useMutation } from "@apollo/client";
import LexicalEditorComponent from "../lexicalEditor";
import LexicalComponent from "../lexicalEditor/editor";

interface AddProductComponentProps {
  categories: Category[];
  toast: any;
}

const CREATE_PRODUCT_MUTATION = gql`
  mutation Mutation($input: ProductsCreateInput!) {
    createProduct(input: $input) {
      id
    }
  }
`;

const CREATE_CATEGORY_MUTATION = gql`
  mutation Mutation($categoryName: String!) {
    createCategory(category_name: $categoryName) {
      created_at
    }
  }
`;

const AddProductComponent: React.FC<AddProductComponentProps> = ({
  categories,
  toast,
}) => {
  const [imageUrlArray, setImageUrlArray] = useState<string[]>([]);
  const [fileUrlArray, setFileUrlArray] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isUploadingImages, setIsUploadingImages] = useState(true);
  const [disableNext, setDisableNext] = useState(true);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // Product detail states
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState<number | "">("");
  const [productCategory, setProductCategory] = useState("");
  const [productCondition, setProductCondition] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [stockQuantity, setStockQuantity] = useState<number | "">("");
  const [createProduct] = useMutation(CREATE_PRODUCT_MUTATION);

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [createCategory] = useMutation(CREATE_CATEGORY_MUTATION);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setSelectedImages((prev) => [...prev, ...files]); // Append to existing images
    }
  };

  const removeSelectedImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append("file", image);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        "https://core.themarketpalace.com/upload/file", // Replace with your upload endpoint
        formData,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : null,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Assuming the URL is returned in response.data.url
      const imageUrl = response.data.file.key;
      const originalName = response.data.file.originalname;
      // const imageUrl = response.data.url;
      setImageUrlArray((prev) => [...prev, imageUrl]); // Add the new image URL to the array
      setFileUrlArray((prev) => [...prev, originalName]); // Add the new image URL to the array
      toast.success(
        `Image uploaded successfully: ${response.data.file.originalname}`
      );
    } catch (error) {
      toast.error("Error uploading image");
      // Handle error appropriately, e.g., show a notification
    }
  };

  const uploadImages = async () => {
    toast.info("Uploading images...");
    // Upload all selected images one by one
    for (const image of selectedImages) {
      await uploadImage(image);
    }

    setDisableNext(false);
  };

  const handleNext = async () => {
    setIsUploadingImages(false); // Move to the next step
    // setSelectedImages([]); // Clear the selected images after uploading
    // setImageUrlArray([]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (imageUrlArray.length === 0) {
      toast.error("Please upload product image(s) first!");
      return;
    }

    if (!productCategory) {
      toast.error("Please select a category for the product!");
      return;
    }

    if (!productName || !productPrice || !stockQuantity) {
      toast.error("Please fill in all required fields!");
      return;
    }

    const productData = {
      category: productCategory,
      image_url: imageUrlArray,
      description: productDescription,
      name: productName,
      price: parseFloat(productPrice.toString()),
      stock_quantity: parseInt(stockQuantity.toString()),
      condition: productCondition,
    };

    if (selectedColors.length > 0) {
      // @ts-ignore
      productData.colors = selectedColors;
    }

    // Here you would handle your product submission logic (e.g., sending productData to your API)

    const id = toast.loading("Please wait...");

    try {
      createProduct({
        variables: {
          input: productData,
        },
        onCompleted: (infoData) => {
          toast.update(id, {
            render: "Product added successfully!",
            type: "success",
            isLoading: false,
          });

          window.location.reload();
        },
        onError: ({ graphQLErrors, networkError }) => {
          // setIsLoading(false);

          if (graphQLErrors) {
            graphQLErrors.forEach(({ message, locations, path }) => {
              toast.update(id, {
                render: message,
                type: "error",
                isLoading: false,
                autoClose: 5000,
              });
            });
          }
          if (networkError) {
            toast.update(id, {
              render: networkError.message,
              type: "error",
              isLoading: false,
              autoClose: 5000,
            });
          }
        },
      });
    } catch (error) {
      toast.update(id, {
        render: `Something went wrong!`,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }

    // Reset form fields after submission

    // handleClose();
  };

  const resetForm = () => {
    setProductName("");
    setProductPrice("");
    setProductCategory("");
    setProductDescription("");
    setStockQuantity("");
    setImageUrlArray([]);
    setFileUrlArray([]);
    setSelectedImages([]);
    setIsUploadingImages(true); // Reset back to the first step
    setSelectedColors([]);
  };
  const handleContentChange = (content: string) => {
    setProductDescription(content);
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      toast.error("Please enter a category name!");
      return;
    }
    const id = toast.loading("Adding category...");

    try {
      await createCategory({
        variables: {
          categoryName: newCategoryName,
        },
        onCompleted: () => {
          toast.update(id, {
            render: "Category added successfully!",
            type: "success",
            isLoading: false,
          });
          setShowCategoryModal(false);
          setNewCategoryName("");
          window.location.reload(); // Reload to fetch updated categories
        },
        onError: ({ graphQLErrors, networkError }) => {
          if (graphQLErrors) {
            graphQLErrors.forEach(({ message }) => {
              toast.update(id, {
                render: message,
                type: "error",
                isLoading: false,
                autoClose: 5000,
              });
            });
          }
          if (networkError) {
            toast.update(id, {
              render: networkError.message,
              type: "error",
              isLoading: false,
              autoClose: 5000,
            });
          }
        },
      });
    } catch (error) {
      toast.update(id, {
        render: "Something went wrong!",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <Modal
        show={showCategoryModal}
        onHide={() => setShowCategoryModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddCategory}>
          <Modal.Body>
            <Form.Group controlId="categoryName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowCategoryModal(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!newCategoryName.trim()}
            >
              Add Category
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Form onSubmit={handleSubmit}>
        {/* Full Width Inputs */}
        <Form.Group controlId="product_name">
          <Form.Label>Product Name *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="product_price" className="mt-3">
          <Form.Label>Price *</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            placeholder="Enter product price"
            value={productPrice}
            onChange={(e) => setProductPrice(Number(e.target.value))}
            required
          />
        </Form.Group>

        <Form.Group controlId="product_stock_quantity" className="mt-3">
          <Form.Label>Stock Quantity *</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter stock quantity"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(Number(e.target.value))}
            required
          />
        </Form.Group>

        <Form.Group controlId="product_category" className="mt-3">
          <div className="flex justify-between items-center">
            <Form.Label>Category *</Form.Label>
            <Button
              variant="link"
              className="text-blue-500 p-0"
              onClick={() => setShowCategoryModal(true)}
            >
              + Add New Category
            </Button>
          </div>
          <Form.Select
            required
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            className="custom-select"
          >
            <option value="" disabled>
              -- Select Category --
            </option>
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
                className="capitalize"
              >
                {category.category_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="product_condition" className="mt-3">
          <Form.Label>Condition *</Form.Label>
          <Form.Select
            required
            value={productCondition}
            onChange={(e) => setProductCondition(e.target.value)}
            className="custom-select"
          >
            <option value="" disabled>
              -- Select Condition --
            </option>
            <option value="new">New</option>
            <option value="used">Used</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="product_colors" className="mt-3">
          <Form.Label>Colors</Form.Label>
          <Form.Select
            onChange={(e) => {
              const selectedColor = e.target.value;
              if (!selectedColors.includes(selectedColor)) {
                setSelectedColors((prev) => [...prev, selectedColor]);
              }
            }}
            className="custom-select"
          >
            <option value="">-- Select Color --</option>
            <option value="#ffffff">White</option>
            <option value="#000000">Black</option>
            <option value="#ff0000">Red</option>
            <option value="#0000ff">Blue</option>
            <option value="#00ff00">Green</option>
            <option value="#ffff00">Yellow</option>
          </Form.Select>
        </Form.Group>

        {/* Display selected colors */}
        {selectedColors.length > 0 && (
          <div className="mt-3">
            <div className="flex flex-row justify-between items-center">
              <h6>Selected Color(s):</h6>
              <Button
                variant="link"
                className="text-danger"
                onClick={() => setSelectedColors([])}
              >
                Clear All
              </Button>
            </div>
            <ul className="flex flex-row space-x-2">
              {selectedColors.map((color, index) => (
                <li key={index} className="mt-3">
                  <div
                    className="w-8 h-8 rounded-full border border-gray-600"
                    style={{ backgroundColor: color }}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Product Images Section */}
        <div className="mt-6">
          <Form.Group controlId="product_image">
            <Form.Label>Product Images</Form.Label>
            <div className="border-2 border-dashed border-gray-300 p-8 rounded-lg">
              <div className="flex flex-col items-center justify-center text-center">
                <svg
                  className="w-12 h-12 mb-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>

                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  multiple
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="mt-4 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 ease-in-out inline-flex items-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Select Images
                </label>
              </div>
            </div>
          </Form.Group>

          {/* Preview Selected Images */}
          {selectedImages.length > 0 && (
            <div className="mt-4">
              <h6 className="font-semibold mb-2">Selected Images:</h6>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {selectedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index}`}
                      className="w-full h-32 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeSelectedImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <Button
                variant="primary"
                onClick={uploadImages}
                className="mt-3 w-full"
                disabled={selectedImages.length === 0}
              >
                Upload Selected Images
              </Button>
            </div>
          )}

          {/* Display Uploaded Images */}
          {imageUrlArray.length > 0 && (
            <div className="mt-4">
              <h6 className="font-semibold mb-2">Uploaded Images:</h6>
              <ul className="space-y-2">
                {fileUrlArray.map((url, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span className="truncate">{url}</span>
                    <Button
                      variant="link"
                      className="text-red-500"
                      onClick={() => {
                        setImageUrlArray((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                        setFileUrlArray((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                      }}
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Description */}
        <Form.Group controlId="product_description" className="mt-6">
          <Form.Label>Description *</Form.Label>
          <LexicalComponent onChange={handleContentChange} />
        </Form.Group>

        {/* Submit Buttons */}
        <div className="mt-6 flex justify-end space-x-4">
          <Button variant="secondary" onClick={resetForm}>
            Reset
          </Button>
          <Button type="submit" variant="info">
            Submit Product
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddProductComponent;
