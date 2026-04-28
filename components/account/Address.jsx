"use client";
import React, { useState } from "react";

export default function Address() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Vincent Pham",
      email: "account@vemus.com",
      company: "Company",
      address: "16 Yarran st",
      city: "Punchbowl",
      country: "Australia",
      postal: "2196",
      phone: "+61 1234 3435",
      isDefault: true,
    },
    {
      id: 2,
      name: "Vincent Pham",
      email: "account@vemus.com",
      company: "Company",
      address: "17 Yarran st",
      city: "Punchbowl",
      country: "Australia",
      postal: "2196",
      phone: "+61 1234 3435",
      isDefault: false,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    address: "",
    city: "",
    country: "",
    postal: "",
    phone: "",
    isDefault: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddNew = () => {
    setFormData({
      name: "",
      email: "",
      company: "",
      address: "",
      city: "",
      country: "",
      postal: "",
      phone: "",
      isDefault: false,
    });
    setShowAddForm(true);
    setEditingId(null);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.isDefault) {
      addresses.forEach((a) => (a.isDefault = false));
    }

    if (editingId) {
      setAddresses((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...formData, id: editingId } : item
        )
      );
    } else {
      setAddresses((prev) => [...prev, { ...formData, id: Date.now() }]);
    }

    setShowAddForm(false);
    setEditingId(null);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    setAddresses((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="my-acount-content account-order">
      <h4 className="heading fw-normal">your addresses ({addresses.length})</h4>
      <div className="widget-inner-address">
        <button
          className="tf-btn btn-fill animate-btn fw-medium btn-add-address"
          onClick={handleAddNew}
        >
          Add new address
        </button>

        {showAddForm && (
          <form
            className="wd-form-address style-border show-form-address"
            style={{ display: showAddForm ? "block" : "none" }}
            onSubmit={handleSubmit}
          >
            <div className="form-content-2">
              <div className="cols tf-grid-layout sm-col-2">
                <fieldset>
                  <label className="text-label">Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    required
                  />
                </fieldset>
                <fieldset>
                  <label className="text-label">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </fieldset>
              </div>
              <fieldset>
                <label className="text-label">Company</label>
                <input
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </fieldset>
              <fieldset>
                <label className="text-label">Address</label>
                <input
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </fieldset>
              <fieldset>
                <label className="text-label">City</label>
                <input
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </fieldset>
              <fieldset>
                <label className="text-label">Country</label>
                <input
                  name="country"
                  type="text"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </fieldset>
              <fieldset>
                <label className="text-label">Postal/ZIP code</label>
                <input
                  name="postal"
                  type="text"
                  value={formData.postal}
                  onChange={handleChange}
                  required
                />
              </fieldset>
              <fieldset>
                <label className="text-label">Phone</label>
                <input
                  name="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </fieldset>
              <div className="checkbox-wrap">
                <input
                  id="set-def"
                  type="checkbox"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleChange}
                />
                <label htmlFor="set-def">Set as default address</label>
              </div>
            </div>
            <div className="group-btn-form">
              <button
                className="tf-btn btn-fill fw-medium animate-btn"
                type="submit"
              >
                {editingId ? "Update" : "Add"}
              </button>
              <button
                type="button"
                className="tf-btn btn-out-line fw-medium"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <ul className="list-account-address tf-grid-layout md-col-2">
          {addresses.map((item) => (
            <li className="account-address-item" key={item.id}>
              <p className="title">
                {item.address}{" "}
                {item.isDefault && <strong>(Default address)</strong>}
              </p>
              <div className="info-detail">
                <div className="box-infor">
                  <span>{item.name}</span>
                  <span>{item.email}</span>
                  <span>{item.company}</span>
                  <span>{item.address}</span>
                  <span>{item.city}</span>
                  <span>{item.country}</span>
                  <span>{item.postal}</span>
                  <span>{item.phone}</span>
                </div>
                <div className="box-btn">
                  <button
                    className="tf-btn btn-out-line fw-medium"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="tf-btn btn-out-line fw-medium"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
