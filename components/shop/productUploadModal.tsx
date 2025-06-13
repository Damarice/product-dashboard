"use client";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { Category } from "@/types/product";
import { gql, useMutation } from "@apollo/client";
import LexicalEditorComponent from "../lexicalEditor";

interface ProductUploadModalProps {
  show: boolean;
  handleClose: () => void;
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

const ProductUploadModal: React.FC<ProductUploadModalProps> = ({
  show,
  handleClose,
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setSelectedImages(files); // Append selected images to the current state
    }
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

          resetForm();
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

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      centered
      backdrop="static"
      keyboard={false}
      animation
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      {isUploadingImages ? (
        <div>
          <Modal.Body>
            <Form.Group controlId="product_image" className="">
              <Form.Label> Product Image(s)</Form.Label>
              <Form.Control
                type="file"
                onChange={handleFileChange}
                accept="image/*" // Optional: Accept only image files
                multiple // Allow multiple files to be selected
              />
              <Button variant="primary" onClick={uploadImages} className="mt-3">
                Upload Image(s)
              </Button>
            </Form.Group>

            {imageUrlArray.length > 0 && (
              <div className="mt-3">
                <h6>Uploaded Image(s):</h6>
                <ul>
                  {fileUrlArray.map((url, index) => (
                    <li key={index}>
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        {url}
                      </a>
                      <Button
                        variant="link"
                        className="text-danger"
                        onClick={() => {
                          setImageUrlArray((prev) =>
                            prev.filter((_, i) => i !== index)
                          ); // Remove image
                          setFileUrlArray((prev) =>
                            prev.filter((_, i) => i !== index)
                          ); // Remove image
                        }}
                      >
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="info" onClick={handleNext} disabled={disableNext}>
              Continue
            </Button>
          </Modal.Footer>
        </div>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
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

            <Form.Group controlId="product_category" className="mt-3">
              <Form.Label>Category*</Form.Label>
              <Form.Select
                required
                value={productCategory}
                onChange={(e) => {
                  setProductCategory(e.target.value);
                }}
                className="custom-select" // Apply the custom class
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
                onChange={(e) => {
                  setProductCondition(e.target.value);
                }}
                className="custom-select" // Apply the custom class
              >
                <option value="" disabled>
                  -- Select Condition --
                </option>
                <option value="new">New</option>
                <option value="used">Used</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="product_colors" className="mt-3">
              <Form.Label>Colors </Form.Label>
              <Form.Select
                // value={selectedColors}
                onChange={(e) => {
                  const selectedColor = e.target.value;
                  if (!selectedColors.includes(selectedColor)) {
                    setSelectedColors((prev) => [...prev, selectedColor]);
                  }
                }}
                className="custom-select" // Apply the custom class
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
            {/* display the selected colors */}
            {selectedColors.length > 0 && (
              <div className="mt-3">
                <div className="flex flex-row justify-between items-center">
                  <h6>Selected Color(s):</h6>
                  <Button
                    variant="link"
                    className="text-danger"
                    onClick={() => {
                      setSelectedColors([]); // Clear all selected colors
                    }}
                  >
                    Clear All
                  </Button>
                </div>

                <ul className="flex flex-row space-x-2 justify-center">
                  {selectedColors.map((color, index) => (
                    <li key={index} className=" mt-3">
                      <div
                        className={`w-8 h-8  rounded-full border border-gray-600`}
                        style={{ backgroundColor: color }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Form.Group controlId="product_description" className="mt-3">
              <Form.Label>Description *</Form.Label>
              {/* <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter product description"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              /> */}
              <LexicalEditorComponent
                handleDescriptionChange={(value: string) => {
                  setProductDescription(value);
                }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                resetForm();
              }}
            >
              Back
            </Button>
            <Button type="submit" variant="info">
              Submit Product
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </Modal>
  );
};

export default ProductUploadModal;
