import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useForm, SubmitHandler } from 'react-hook-form';

// form inputs
type FormInputs = {
  id?: number;
  service: string;
  vehicle: string;
  price: number;
  minDist: number;
  maxDist: number;
  day: string;
  startTime: string;
  endTime: string;
  multiplier: number;
  status: string;
};

export const ExampleComponent = () => {
  const [selectedType, setSelectedType] = useState('Select');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditOverlay, setShowEditOverlay] = useState(false);

  // --- States for Data ---
  const [flatData, setFlatData] = useState<any[]>([
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
  const [slabData, setSlabData] = useState<any[]>([
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
  const [dayWiseData, setDayWiseData] = useState<any[]>([
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

  // --- React Hook Form for Add Forms ---
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    clearErrors,
  } = useForm<FormInputs>({
    defaultValues: { service: '', vehicle: '', status: 'Active' },
  });

  // --- React Hook Form for Edit Overlay ---
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: errorsEdit },
    reset: resetEdit,
  } = useForm<FormInputs>();

  const currentMinDist = watch('minDist');

  // Status Styling
  const status = (row: any) => (
    <span
      className={row.status === 'Active' ? 'status-active' : 'status-expired'}
    >
      {row.status}
    </span>
  );

  // --- Columns Definitions ---
  const flatColumns = [
    {
      name: 'S.No',
      cell: (row: any, index: number) => index + 1,
      width: '90px',
    },
    { name: 'Vehicle', selector: (row: any) => row.vehicle, sortable: true },
    { name: 'Service', selector: (row: any) => row.serviceType },
    { name: 'Flat Price', selector: (row: any) => `₹${row.flatPrice}` },
    { name: 'Min Dist', selector: (row: any) => `${row.minDist} km` },
    { name: 'Max Dist', selector: (row: any) => `${row.maxDist} km` },
    { name: 'Status', cell: status },
  ];

  const slabColumns = [
    {
      name: 'S.No',
      cell: (row: any, index: number) => index + 1,
      width: '70px',
    },
    { name: 'Vehicle', selector: (row: any) => row.vehicle },
    { name: 'Service', selector: (row: any) => row.service },
    { name: 'Price Per KM', selector: (row: any) => `₹${row.perKmPrice}` },
    { name: 'Min Dist', selector: (row: any) => `${row.minDist} km` },
    { name: 'Max Dist', selector: (row: any) => `${row.maxDist} km` },
    { name: 'Status', cell: status },
  ];

  const dayWiseColumns = [
    {
      name: 'S.No',
      cell: (row: any, index: number) => index + 1,
      width: '70px',
    },
    { name: 'Vehicle', selector: (row: any) => row.vehicle },
    { name: 'Service', selector: (row: any) => row.service },
    { name: 'Day', selector: (row: any) => row.day },
    { name: 'Start', selector: (row: any) => row.startTime },
    { name: 'End', selector: (row: any) => row.endTime },
    { name: 'Multiplier', selector: (row: any) => `${row.multiplier}x` },
    { name: 'Status', cell: status },
    {
      name: 'Actions',
      cell: (row: any) => (
        <button
          className="edit-btn"
          onClick={() => {
            resetEdit(row);
            setShowEditOverlay(true);
          }}
        >
          Edit
        </button>
      ),
    },
  ];

  // --- Add Form Submit Handler ---
  const onAddSubmit: SubmitHandler<FormInputs> = data => {
    const commonData = {
      id: Date.now(),
      service: data.service,
      vehicle: data.vehicle,
      status: data.status || 'Active',
    };

    if (selectedType === 'Flat') {
      setFlatData([
        ...flatData,
        {
          ...commonData,
          serviceType: data.service,
          flatPrice: data.price,
          minDist: data.minDist,
          maxDist: data.maxDist,
        },
      ]);
    } else if (selectedType === 'slab') {
      setSlabData([
        ...slabData,
        {
          ...commonData,
          perKmPrice: data.price,
          minDist: data.minDist,
          maxDist: data.maxDist,
        },
      ]);
    } else if (selectedType === 'DayWise') {
      setDayWiseData([
        ...dayWiseData,
        {
          ...commonData,
          day: data.day,
          startTime: data.startTime,
          endTime: data.endTime,
          multiplier: data.multiplier,
        },
      ]);
    }

    setShowAddForm(false);
    reset(); // reset
  };

  // --- Edit Form Submit Handler ---
  const onEditSubmit: SubmitHandler<FormInputs> = data => {
    setDayWiseData(dayWiseData.map(d => (d.id === data.id ? data : d)));
    setShowEditOverlay(false);
  };

  const handleTypeChange = (e: any) => {
    setSelectedType(e.target.value);
    setShowAddForm(false);
    reset();
    clearErrors();
  };

  return (
    <div className="price">
      <h1 className="Top-Data">Price Management</h1>

      <div className="select-add">
        <select value={selectedType} onChange={handleTypeChange}>
          <option value="Select">Select Type</option>
          <option value="Flat">Flat</option>
          <option value="slab">Slab</option>
          <option value="DayWise">DayWise</option>
        </select>
        {selectedType !== 'Select' && (
          <button
            className="add-btn"
            onClick={() => {
              reset();
              setShowAddForm(true);
            }}
          >
            Add Price
          </button>
        )}
      </div>

      {selectedType === 'Select' && (
        <div className="message-container">
          <h1 className="display-msg">select the price type to display data</h1>
        </div>
      )}

      {/* ADD PRICE FORM */}
      {showAddForm && selectedType !== 'Select' && (
        <div
          style={{
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid black',
          }}
        >
          <form onSubmit={handleSubmit(onAddSubmit)}>
            <div className="form-grid">
              {/* Common Fields */}
              <div className="form-group">
                <label>Service</label>
                <select
                  {...register('service', { required: 'Service is required' })}
                >
                  <option value="">Select Service</option>
                  <option value="Ride">Ride</option>
                  <option value="Parcel">Parcel</option>
                  <option value="Scheduled">Scheduled</option>
                </select>
                {errors.service && (
                  <span className="error-text">{errors.service.message}</span>
                )}
              </div>

              <div className="form-group">
                <label>Vehicle</label>
                <select
                  {...register('vehicle', { required: 'Vehicle is required' })}
                >
                  <option value="">Select Vehicle</option>
                  <option value="Bike">Bike</option>
                  <option value="Auto">Auto</option>
                  <option value="Car">Car</option>
                </select>
                {errors.vehicle && (
                  <span className="error-text">{errors.vehicle.message}</span>
                )}
              </div>

              {/* Flat & Slab Specific Fields */}
              {(selectedType === 'Flat' || selectedType === 'slab') && (
                <>
                  <div className="form-group">
                    <label>
                      {selectedType === 'Flat' ? 'Price' : 'Price/KM'}
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 100"
                      {...register('price', {
                        required: 'Price is required',
                        min: { value: 1, message: 'Must be > 0' },
                      })}
                    />
                    {errors.price && (
                      <span className="error-text">{errors.price.message}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Min Dist (KM)</label>
                    <input
                      type="number"
                      placeholder="e.g. 0"
                      {...register('minDist', {
                        required: 'Required',
                        min: { value: 0, message: 'Invalid' },
                      })}
                    />
                    {errors.minDist && (
                      <span className="error-text">
                        {errors.minDist.message}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Max Dist (KM)</label>
                    <input
                      type="number"
                      placeholder="e.g. 10"
                      {...register('maxDist', {
                        required: 'Required',
                        validate: value =>
                          !currentMinDist ||
                          value > currentMinDist ||
                          'Must be > Min Dist',
                      })}
                    />
                    {errors.maxDist && (
                      <span className="error-text">
                        {errors.maxDist.message}
                      </span>
                    )}
                  </div>
                </>
              )}

              {/* DayWise Specific Fields */}
              {selectedType === 'DayWise' && (
                <>
                  <div className="form-group">
                    <label>Day</label>
                    <input
                      placeholder="e.g. Monday"
                      {...register('day', { required: 'Day is required' })}
                    />
                    {errors.day && (
                      <span className="error-text">{errors.day.message}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Start Time</label>
                    <input
                      type="time"
                      {...register('startTime', {
                        required: 'Start time required',
                      })}
                    />
                    {errors.startTime && (
                      <span className="error-text">
                        {errors.startTime.message}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>End Time</label>
                    <input
                      type="time"
                      {...register('endTime', {
                        required: 'End time required',
                      })}
                    />
                    {errors.endTime && (
                      <span className="error-text">
                        {errors.endTime.message}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Multiplier</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="e.g. 1.2"
                      {...register('multiplier', {
                        required: 'Required',
                        min: { value: 0.1, message: 'Min 0.1' },
                      })}
                    />
                    {errors.multiplier && (
                      <span className="error-text">
                        {errors.multiplier.message}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select {...register('status')}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setShowAddForm(false);
                  reset();
                }}
              >
                Cancel
              </button>
              <button type="submit" className="save-btn">
                Add Price
              </button>
            </div>
          </form>
        </div>
      )}

      {/* --- DATA TABLE --- */}
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

      {/* --- EDIT OVERLAY --- */}
      {showEditOverlay && (
        <div className="overlay">
          <div className="modal-content">
            <h3>Edit DayWise Price</h3>
            <form onSubmit={handleSubmitEdit(onEditSubmit)}>
              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label>Day</label>
                <input
                  {...registerEdit('day', { required: 'Day is required' })}
                />
                {errorsEdit.day && (
                  <span className="error-text">{errorsEdit.day.message}</span>
                )}
              </div>

              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label>Start Time</label>
                <input
                  type="time"
                  {...registerEdit('startTime', {
                    required: 'Start time required',
                  })}
                />
                {errorsEdit.startTime && (
                  <span className="error-text">
                    {errorsEdit.startTime.message}
                  </span>
                )}
              </div>

              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label>End Time</label>
                <input
                  type="time"
                  {...registerEdit('endTime', {
                    required: 'End time required',
                  })}
                />
                {errorsEdit.endTime && (
                  <span className="error-text">
                    {errorsEdit.endTime.message}
                  </span>
                )}
              </div>

              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label>Multiplier</label>
                <input
                  type="number"
                  step="0.1"
                  {...registerEdit('multiplier', {
                    required: 'Required',
                    min: { value: 0.1, message: 'Min 0.1' },
                  })}
                />
                {errorsEdit.multiplier && (
                  <span className="error-text">
                    {errorsEdit.multiplier.message}
                  </span>
                )}
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label>Status</label>
                <select {...registerEdit('status')}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowEditOverlay(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="update-btn">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
