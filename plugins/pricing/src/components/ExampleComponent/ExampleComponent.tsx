import DataTable from 'react-data-table-component';
export const ExampleComponent = () => {
  const columns = [
    {
      name: 'Title',
      selector: (row: any) => row.title,
    },
    {
      name: 'Year',
      selector: (row: any) => row.year,
      sortable: true,
    },
  ];
  const data = [
    {
      id: 1,
      title: 'Beetlejuice',
      year: '1988',
    },
    {
      id: 2,
      title: 'Ghostbusters',
      year: '1984',
    },
  ];
  return (
    <div className="price">
      <h1 className="Top-Data">Price Management</h1>
      <div className="main">
        <div className="select-add">
          <div className="Selection">
            <select>
              <option>Select</option>
              <option>Flat</option>
              <option>slab</option>
              <option>DayWise</option>
            </select>
          </div>
          <div className="add">
            <button>Add Price</button>
          </div>
        </div>
        <hr />
        <div className="table">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
};
