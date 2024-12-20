import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditSubscription() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedData, setEditedData] = useState({ name: '', status: '', service: null });
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subscriptionResponse = await axios.get('http://3.218.8.102/api/subscriptions?page=0&size=20&sort=id,asc');
        setSubscriptions(subscriptionResponse.data);

        const servicesResponse = await axios.get('http://3.218.8.102/api/services');
        setServices(servicesResponse.data);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const startEditing = (subscription) => {
    setEditMode(subscription.id);
    setEditedData({
      name: subscription.name,
      status: subscription.status,
      service: subscription.service ? subscription.service.id : '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const saveEdit = async (id) => {
    try {
      const selectedService = services.find((service) => service.id === parseInt(editedData.service, 10));
      const payload = {
        id,
        name: editedData.name,
        status: editedData.status,
        service: selectedService,
      };
      await axios.put(`http://3.218.8.102/api/subscriptions/${id}`, payload);
      alert('Subscription updated successfully!');
      setEditMode(null);
    } catch (err) {
      alert('Error saving subscription: ' + err.message);
    }
  };

  if (loading) {
    return <div className="text-center mt-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-6 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Edit Subscriptions</h1>
      <div className="w-full max-w-2xl space-y-4">
        {subscriptions.map((subscription) => (
          <div key={subscription.id} className="bg-white p-4 rounded-lg shadow-md">
            {editMode === subscription.id ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editedData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Status</label>
                  <input
                    type="text"
                    name="status"
                    value={editedData.status}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Service</label>
                  <select
                    name="service"
                    value={editedData.service}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select a Service</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name} - ${service.price.toFixed(2)}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => saveEdit(subscription.id)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md font-semibold"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditMode(null)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md ml-2"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">{subscription.name}</h2>
                  <p className="text-gray-600">Status: {subscription.status}</p>
                  {subscription.service && <p className="text-gray-600">Service: {subscription.service.name}</p>}
                </div>
                <button
                  onClick={() => startEditing(subscription)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-4 rounded-md font-semibold"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EditSubscription;
