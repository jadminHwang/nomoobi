import React, { useState, useEffect } from 'react';
import './App.css';
import WageSearch from './components/WageSearch';
import WageTable from './components/WageTable';
import { fetchWageData } from './services/kosisApi';

export interface WageData {
  직종: string;
  지역: string;
  단가: number;
  기준일: string;
}

function App() {
  const [wageData, setWageData] = useState<WageData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // 초기 로드 시 전체 데이터 표시
  useEffect(() => {
    handleSearch({ 직종: '', 년도: '전체' });
  }, []);

  const handleSearch = async (searchParams: any) => {
    setLoading(true);
    setError('');
    
    try {
      const data = await fetchWageData(searchParams);
      setWageData(data);
    } catch (err) {
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🏗️ 개별직종 노임단가 정보</h1>
        <p>국가통계포털(KOSIS) 데이터 기반</p>
      </header>
      
      <main className="container">
        <WageSearch onSearch={handleSearch} loading={loading} />
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <WageTable data={wageData} loading={loading} />
      </main>
      
      <footer className="App-footer">
        <p>데이터 출처: 국가통계포털(KOSIS)</p>
      </footer>
    </div>
  );
}

export default App;
