import React, { useState } from 'react';
import './WageTable.css';

interface WageData {
  직종: string;
  지역: string;
  단가: number;
  기준일: string;
}

interface WageTableProps {
  data: WageData[];
  loading: boolean;
}

const WageTable: React.FC<WageTableProps> = ({ data, loading }) => {
  const [sortField, setSortField] = useState<keyof WageData>('단가');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof WageData) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    const aStr = String(aValue);
    const bStr = String(bValue);
    
    if (sortDirection === 'asc') {
      return aStr.localeCompare(bStr, 'ko');
    } else {
      return bStr.localeCompare(aStr, 'ko');
    }
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const exportToTxt = () => {
    const header = '직종\t지역\t단가\t기준일\n';
    const content = sortedData.map(item => 
      `${item.직종}\t${item.지역}\t${item.단가}\t${item.기준일}`
    ).join('\n');
    
    const txtContent = header + content;
    const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `노임단가_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportToCSV = () => {
    const header = '직종,지역,단가,기준일\n';
    const content = sortedData.map(item => 
      `"${item.직종}","${item.지역}",${item.단가},"${item.기준일}"`
    ).join('\n');
    
    const csvContent = header + content;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `노임단가_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="wage-table-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>데이터를 불러오는 중입니다...</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="wage-table-container">
        <div className="no-data">
          <h3>📋 검색 결과가 없습니다</h3>
          <p>다른 검색 조건으로 다시 시도해보세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="wage-table-container">
      <div className="table-header">
        <div className="header-content">
          <div className="header-info">
            <h3>📊 노임단가 검색 결과</h3>
            <p className="result-count">총 {data.length}건의 결과</p>
          </div>
          <div className="export-buttons">
            <button onClick={exportToCSV} className="export-btn csv-btn">
              📊 CSV 저장
            </button>
            <button onClick={exportToTxt} className="export-btn txt-btn">
              📄 TXT 저장
            </button>
          </div>
        </div>
      </div>
      
      <div className="table-wrapper">
        <table className="wage-table">
          <thead>
            <tr>
              <th 
                onClick={() => handleSort('직종')}
                className={`sortable ${sortField === '직종' ? 'active' : ''}`}
              >
                직종
                {sortField === '직종' && (
                  <span className="sort-icon">
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                onClick={() => handleSort('지역')}
                className={`sortable ${sortField === '지역' ? 'active' : ''}`}
              >
                지역
                {sortField === '지역' && (
                  <span className="sort-icon">
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                onClick={() => handleSort('단가')}
                className={`sortable ${sortField === '단가' ? 'active' : ''}`}
              >
                단가
                {sortField === '단가' && (
                  <span className="sort-icon">
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                onClick={() => handleSort('기준일')}
                className={`sortable ${sortField === '기준일' ? 'active' : ''}`}
              >
                기준일
                {sortField === '기준일' && (
                  <span className="sort-icon">
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index} className="table-row">
                <td className="job-type">{item.직종}</td>
                <td className="region">{item.지역}</td>
                <td className="wage">{formatCurrency(item.단가)}</td>
                <td className="date">{item.기준일}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WageTable;
