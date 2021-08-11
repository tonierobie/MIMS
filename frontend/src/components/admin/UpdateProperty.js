import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProperty,
  getPropertyDetails,
  clearErrors,
} from "../../actions/propertyActions";
import { UPDATE_PROPERTY_RESET } from "../../constants/propertyConstants";

const UpdateProperty = ({ match, history }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [imgDir, setImgDir] = useState("");
  const [images, setImages] = useState([]);

  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Apartment for sale",
    "House for sale",
    "Office space for sale",
    "Warehouse for sale",
    "Land for sale",
    "Apartment for rent",
    "House for rent",
    "Office space for rent",
    "Warehouse for rent",
    "Land for Lease",
    "1 bedroom to let",
    "2 bedroom to let",
    "3 bedroom to let",
    "4 bedroom to let",
    "5 bedroom to let",
  ];

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, property } = useSelector((state) => state.propertyDetails);
  const { loading, error: updateError, isUpdated } = useSelector(
    (state) => state.property
  );

  const propertyId = match.params.id;

  useEffect(() => {
    if (property && property._id !== propertyId) {
      dispatch(getPropertyDetails(propertyId));
    } else {
      setName(property.name);
      setPrice(property.price);
      setDescription(property.description);
      setCategory(property.category);
      setSeller(property.seller);
      setStock(property.stock);
      setImgDir(property.imageDir);
      setOldImages(property.images);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      dispatch(getPropertyDetails(propertyId));
      history.push("/admin/properties");
      alert.success("Property updated successfully");
      dispatch({ type: UPDATE_PROPERTY_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    isUpdated,
    history,
    updateError,
    property,
    propertyId,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", category);
    formData.set("stock", stock);
    formData.set("seller", seller);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(updateProperty(property._id, formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 10) {
      alert.error(`Cannot upload more than 10 files`);
      return;
    }

    if (files.length > 10) {
      alert.error(`Cannot upload more than 10 files`);
      return;
    }

    setImagesPreview([]);
    setImages([]);
    setOldImages([]);

    files.forEach((file) => {
      if (!file.type.match("image.*")) {
        alert.error("Select images only");
        return;
      }
      if (file.size >= 10240 * 1024) {
        alert.error("File too Big, please select a file less than 10mb");
        return;
      }
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title={"Update Property"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div className="wrapper my-5">
              <form
                className="shadow-lg"
                onSubmit={submitHandler}
                encType="multipart/form-data"
              >
                <h1 className="mb-4">Update Property</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price_field">Price</label>
                  <input
                    type="text"
                    id="price_field"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description_field">Description</label>
                  <textarea
                    className="form-control"
                    id="description_field"
                    rows="8"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="category_field">Category</label>
                  <select
                    className="form-control"
                    id="category_field"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="stock_field">Stock</label>
                  <input
                    type="number"
                    id="stock_field"
                    className="form-control"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="seller_field">Seller Name</label>
                  <input
                    type="text"
                    id="seller_field"
                    className="form-control"
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Images</label>

                  <div className="custom-file">
                    <input
                      type="file"
                      name="property_images"
                      className="custom-file-input"
                      id="customFile"
                      onChange={onChange}
                      multiple
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Images
                    </label>
                  </div>

                  {oldImages &&
                    oldImages.map((img) => (
                      <img
                        key={img.url}
                        src={`/uploads/properties/${imgDir}/${img.url}`}
                        alt={img.url}
                        className="mt-3 mr-2"
                        width="55"
                        height="52"
                      />
                    ))}

                  {imagesPreview.map((img) => (
                    <img
                      src={img}
                      key={img}
                      alt="Images Preview"
                      className="mt-3 mr-2"
                      width="55"
                      height="52"
                    />
                  ))}
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={loading ? true : false}
                >
                  UPDATE
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProperty;
