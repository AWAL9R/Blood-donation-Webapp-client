import React from 'react';

const Pagination = ({pages=0, currentPage=0, setCurrentPage }) => {
    
    return (
        <div className='flex gap-1 flex-wrap space-y-2'>
            {currentPage>0 && <button className={`btn `} onClick={()=>setCurrentPage?.(currentPage-1)}>Prev.</button>}
            {[...Array(pages).keys().map(i=><button key={i} className={`btn ${currentPage==i&&"btn-primary"}`} onClick={()=>setCurrentPage?.(i)}>{i+1}</button>)]}
            {currentPage<(pages-1) && <button className={`btn `} onClick={()=>setCurrentPage?.(currentPage+1)}>Next.</button>}
        </div>
    );
};

export default Pagination;