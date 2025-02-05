import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Pagination } from 'antd';
import 'antd/dist/reset.css'; 
import './App.css'; 

const { Option } = Select;

const App = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [pageSize, setPageSize] = useState(5); 
  const [searchName, setSearchName] = useState(''); 
  const [searchCountry, setSearchCountry] = useState(''); 

  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      try {
        const response = await fetch(
          'https://gist.githubusercontent.com/ak1103dev/e4a31efd9f5dcac80e086f0ab9a88ffb/raw/e77545dbef9b06bd138b085b5421eaca77cfe18f/cars.json'
        );
        const result = await response.json();
        console.log('Data from API:', result.Makes); 
        setData(result.Makes);  
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); 
      }
    };
    fetchData();
  }, []);

  
  const filteredData = Array.isArray(data)
    ? data.filter((item) => {
        return (
          (searchName === '' || item.make_display.toLowerCase().includes(searchName.toLowerCase())) &&
          (searchCountry === '' || item.make_country.toLowerCase() === searchCountry.toLowerCase())
        );
      })
    : [];

  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'make_display',
      key: 'make_display',
    },
    {
      title: 'Country',
      dataIndex: 'make_country',
      key: 'make_country',
    },
  ];

  
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div style={{ padding: '20px', backgroundColor: '#E6F7FF' }}> 
      <div className="title-left" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Cars</div>
      
      <div className="form-container" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <Select
          placeholder="Select Country"
          value={searchCountry || undefined} 
          onChange={(value) => setSearchCountry(value)}
          className="input"
          style={{ width: '300px', height: '50px' }} 
          allowClear
            >
          <Option value="Italy">Italy</Option>
          <Option value="UK">UK</Option>
          <Option value="USA">USA</Option>
          <Option value="Germany">Germany</Option>
          <Option value="France">France</Option>
          <Option value="China">China</Option>
          <Option value="Romania">Romania</Option>
          <Option value="South Korea">South Korea</Option>
          <Option value="Netherlands">Netherlands</Option>
          <Option value="Japan">Japan</Option>
          <Option value="Russia">Russia</Option>
          <Option value="Australia">Australia</Option>
          <Option value="Sweden">Sweden</Option>
          <Option value="Austria">Austria</Option>
          <Option value="Switzerland">Switzerland</Option>
          <Option value="Malaysia">Malaysia</Option>
          <Option value="Spain">Spain</Option>
          <Option value="Czech Republic">Czech Republic</Option>
          <Option value="Taiwan">Taiwan</Option>
          <Option value="India">India</Option>
          <Option value="Serbia">Serbia</Option>
          <Option  ption value="Ukraine">Ukraine</Option>
          <Option value="Denmark">Denmark</Option>

      </Select>


        <div className="input-container">
          <Input
            placeholder="Search Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="input"
            style={{ width: '200px' }}
          />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={paginatedData}
        pagination={false} 
        loading={loading} 
        style={{ marginTop: 20, width: '100%' }}
        rowKey="make_id"
      />

      <Pagination
        current={currentPage}
        total={filteredData.length}
        pageSize={pageSize}
        onChange={handlePageChange}
        style={{ marginTop: 20, textAlign: 'center' }}
      />
    </div>
  );
};

export default App;
