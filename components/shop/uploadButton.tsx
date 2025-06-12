"use client";

import { Fragment, Suspense, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ProductUploadModal from "./productUploadModal";
import { Category } from "@/types/product";
import { useRouter } from "next/navigation";
interface UploadButtonProps {
  categories: Category[];
  toast: any;
}

export default function UploadButton({ categories, toast }: UploadButtonProps) {
  const router = useRouter();

  const handleNavigate = () => router.push("/add-product");

  return (
    <Fragment>
      <div className="container d-flex justify-content-end mb-3 mt-2">
        <Button variant="info" onClick={handleNavigate}>
          Add Product
        </Button>
      </div>
    </Fragment>
  );
}
