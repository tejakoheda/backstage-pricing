import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

export const ExampleComponent = () => {
  const [selectedType, setSelectedType] = useState('Select');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditOverlay, setShowEditOverlay] = useState(false);
  const [editingRow, setEditingRow] = useState<any>(null);

  // --- States for Data ---
  const [flatData, setFlatData] = useState([
    {
      id: 1,
      vehicle: 'Bike',
      serviceType: 'Ride',
      flatPrice: '50',
      minDist: '0',
      maxDist: '5',
      status: 'Active',
    },
  ]);
  const [slabData, setSlabData] = useState([
    {
      id: 1,
      vehicle: 'Car',
      service: 'Ride',
      perKmPrice: '12',
      minDist: '5',
      maxDist: '15',
      status: 'Inactive',
    },
  ]);
  const [dayWiseData, setDayWiseData] = useState([
    {
      id: 1,
      vehicle: 'Bike',
      service: 'Ride',
      day: 'Monday',
      startTime: '09:00',
      endTime: '11:00',
      multiplier: '1.5',
      status: 'Active',
    },
  ]);

  // --- Form States ---
  const [formData, setFormData] = useState<any>({
    service: '',
    vehicle: '',
    status: 'Active',
  });

  // Status Cell Styling
  const statusCell = (row: any) => (
    <span
      className={row.status === 'Active' ? 'status-active' : 'status-expired'}
    >
      {row.status}
    </span>
  );

  // --- Columns ---
  const flatColumns = [
    { name: 'S.No', selector: (row: any) => row.id, width: '70px' },
    { name: 'Vehicle', selector: (row: any) => row.vehicle },
    { name: 'Service Type', selector: (row: any) => row.serviceType },
    { name: 'Flat Price', selector: (row: any) => `₹${row.flatPrice}` },
    { name: 'Min Distance', selector: (row: any) => `${row.minDist} km` },
    { name: 'Max Distance', selector: (row: any) => `${row.maxDist} km` },
    { name: 'Status', cell: statusCell },
  ];

  const slabColumns = [
    { name: 'S.No', selector: (row: any) => row.id, width: '70px' },
    { name: 'Vehicle', selector: (row: any) => row.vehicle },
    { name: 'Service', selector: (row: any) => row.service },
    { name: 'Price Per KM', selector: (row: any) => `₹${row.perKmPrice}` },
    { name: 'Min Distance', selector: (row: any) => `${row.minDist} km` },
    { name: 'Max Distance', selector: (row: any) => `${row.maxDist} km` },
    { name: 'Status', cell: statusCell },
  ];

  const dayWiseColumns = [
    { name: 'S.No', selector: (row: any) => row.id, width: '70px' },
    { name: 'Vehicle', selector: (row: any) => row.vehicle },
    { name: 'Service', selector: (row: any) => row.service },
    { name: 'Day', selector: (row: any) => row.day },
    { name: 'Start', selector: (row: any) => row.startTime },
    { name: 'End', selector: (row: any) => row.endTime },
    { name: 'Multiplier', selector: (row: any) => `${row.multiplier}x` },
    { name: 'Status', cell: statusCell },
    {
      name: 'Actions',
      cell: (row: any) => (
        <button
          className="edit-btn"
          onClick={() => {
            setEditingRow(row);
            setShowEditOverlay(true);
          }}
        >
          Edit
        </button>
      ),
    },
  ];

  // --- Handlers ---
  const handleAddData = () => {
    if (
      !formData.service ||
      !formData.vehicle ||
      formData.service === 'Select' ||
      formData.vehicle === 'Select'
    ) {
      alert('Please select Service and Vehicle');
      return;
    }

    const commonData = { ...formData, id: Date.now() };
    if (selectedType === 'Flat') {
      setFlatData([
        ...flatData,
        {
          ...commonData,
          serviceType: formData.service,
          flatPrice: formData.price,
        },
      ]);
    } else if (selectedType === 'slab') {
      setSlabData([...slabData, { ...commonData, perKmPrice: formData.price }]);
    } else if (selectedType === 'DayWise') {
      setDayWiseData([...dayWiseData, commonData]);
    }
    setShowAddForm(false);
    setFormData({ service: '', vehicle: '', status: 'Active' });
  };

  return (
    <div className="price">
      <h1 className="Top-Data">Price Management</h1>

      <div className="select-add">
        <select
          value={selectedType}
          onChange={e => {
            setSelectedType(e.target.value);
            setShowAddForm(false);
          }}
        >
          <option value="Select">Select Type</option>
          <option value="Flat">Flat</option>
          <option value="slab">Slab</option>
          <option value="DayWise">DayWise</option>
        </select>
        {selectedType !== 'Select' && (
          <button className="add-btn" onClick={() => setShowAddForm(true)}>
            Add Price
          </button>
        )}
      </div>

      {selectedType === 'Select' && (
        <div className="message-container">
          <h1 className="display-msg">select the price type to display data</h1>
        </div>
      )}

      {showAddForm && selectedType !== 'Select' && (
        <div className="form-container">
          <div className="form-grid">
            <div className="form-group">
              <label>Service</label>
              <select
                value={formData.service}
                onChange={e =>
                  setFormData({ ...formData, service: e.target.value })
                }
              >
                <option value="">Select Service</option>
                <option value="Ride">Ride</option>
                <option value="Parcel">Parcel</option>
                <option value="Scheduled">Scheduled</option>
              </select>
            </div>
            <div className="form-group">
              <label>Vehicle</label>
              <select
                value={formData.vehicle}
                onChange={e =>
                  setFormData({ ...formData, vehicle: e.target.value })
                }
              >
                <option value="">Select Vehicle</option>
                <option value="Bike">Bike</option>
                <option value="Auto">Auto</option>
                <option value="Car">Car</option>
              </select>
            </div>

            {selectedType === 'Flat' && (
              <>
                <div className="form-group">
                  <label>Min KM</label>
                  <input
                    type="number"
                    placeholder="e.g. 0"
                    onChange={e =>
                      setFormData({ ...formData, minDist: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Max KM</label>
                  <input
                    type="number"
                    placeholder="e.g. 10"
                    onChange={e =>
                      setFormData({ ...formData, maxDist: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    placeholder="e.g. 100"
                    onChange={e =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>
              </>
            )}

            {selectedType === 'slab' && (
              <>
                <div className="form-group">
                  <label>Price/KM</label>
                  <input
                    type="number"
                    placeholder="e.g. 15"
                    onChange={e =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Min Dist</label>
                  <input
                    type="number"
                    placeholder="e.g. 5"
                    onChange={e =>
                      setFormData({ ...formData, minDist: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Max Dist</label>
                  <input
                    type="number"
                    placeholder="e.g. 20"
                    onChange={e =>
                      setFormData({ ...formData, maxDist: e.target.value })
                    }
                  />
                </div>
              </>
            )}

            {selectedType === 'DayWise' && (
              <>
                <div className="form-group">
                  <label>Day</label>
                  <input
                    placeholder="e.g. Monday"
                    onChange={e =>
                      setFormData({ ...formData, day: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Start Time</label>
                  <input
                    type="time"
                    onChange={e =>
                      setFormData({ ...formData, startTime: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>End Time</label>
                  <input
                    type="time"
                    onChange={e =>
                      setFormData({ ...formData, endTime: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Multiplier</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g. 1.2"
                    onChange={e =>
                      setFormData({ ...formData, multiplier: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    onChange={e =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </>
            )}
          </div>
          <div className="form-actions">
            <button
              className="cancel-btn"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </button>
            <button className="save-btn" onClick={handleAddData}>
              Add Price
            </button>
          </div>
        </div>
      )}

      {selectedType !== 'Select' && (
        <div className="table">
          <DataTable
            columns={
              selectedType === 'Flat'
                ? flatColumns
                : selectedType === 'slab'
                ? slabColumns
                : dayWiseColumns
            }
            data={
              selectedType === 'Flat'
                ? flatData
                : selectedType === 'slab'
                ? slabData
                : dayWiseData
            }
            pagination
            highlightOnHover
          />
        </div>
      )}

      {showEditOverlay && (
        <div className="overlay">
          <div className="modal-content">
            <h3>Edit DayWise Price</h3>
            <div className="form-group">
              <label>Day</label>
              <input
                value={editingRow.day}
                onChange={e =>
                  setEditingRow({ ...editingRow, day: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Start Time</label>
              <input
                type="time"
                value={editingRow.startTime}
                onChange={e =>
                  setEditingRow({ ...editingRow, startTime: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>End Time</label>
              <input
                type="time"
                value={editingRow.endTime}
                onChange={e =>
                  setEditingRow({ ...editingRow, endTime: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Multiplier</label>
              <input
                type="number"
                step="0.1"
                value={editingRow.multiplier}
                onChange={e =>
                  setEditingRow({ ...editingRow, multiplier: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                value={editingRow.status}
                onChange={e =>
                  setEditingRow({ ...editingRow, status: e.target.value })
                }
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="form-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowEditOverlay(false)}
              >
                Cancel
              </button>
              <button
                className="update-btn"
                onClick={() => {
                  setDayWiseData(
                    dayWiseData.map(d =>
                      d.id === editingRow.id ? editingRow : d,
                    ),
                  );
                  setShowEditOverlay(false);
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
