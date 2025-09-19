import React, { useState } from 'react';
import './WageSearch.css';

interface WageSearchProps {
  onSearch: (params: any) => void;
  loading: boolean;
}

const WageSearch: React.FC<WageSearchProps> = ({ onSearch, loading }) => {
  const [searchParams, setSearchParams] = useState({
    직종: '',
    년도: '전체'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  const handleReset = () => {
    setSearchParams({
      직종: '',
      년도: '전체'
    });
  };

  const handleViewAll = () => {
    onSearch({ 직종: '', 년도: searchParams.년도 });
  };

  return (
    <div className="wage-search">
      <h2>🔍 노임단가 검색</h2>
      
      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-group">
          <label htmlFor="직종">직종</label>
          <input
            type="text"
            id="직종"
            name="직종"
            value={searchParams.직종}
            onChange={handleInputChange}
            placeholder="예: 건축일반시공, 건축목공"
            className="form-input"
          />
        </div>


        <div className="form-group">
          <label htmlFor="년도">기준년도</label>
          <select
            id="년도"
            name="년도"
            value={searchParams.년도}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="전체">전체 기간</option>
            <option value="2025">2025년</option>
            <option value="2024">2024년</option>
            <option value="2023">2023년</option>
            <option value="2022">2022년</option>
            <option value="2021">2021년</option>
          </select>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? '검색 중...' : '검색하기'}
          </button>
          
          <button 
            type="button" 
            onClick={handleViewAll}
            className="btn btn-success"
            disabled={loading}
          >
            전체보기
          </button>
          
          <button 
            type="button" 
            onClick={handleReset}
            className="btn btn-secondary"
            disabled={loading}
          >
            초기화
          </button>
        </div>
      </form>
    </div>
  );
};

export default WageSearch;
