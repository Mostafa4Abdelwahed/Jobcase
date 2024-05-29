import ReactPaginate from 'react-paginate'

const pagination = ({getPage, totalPages}) => {
    const handlePageClick = (data)=>{
        getPage(data.selected + 1)
    }
    
    const pageCount = totalPages;
    return (
        <>
            <ReactPaginate
                breakLabel="..."
                nextLabel="التالي"
                onPageChange={handlePageClick}
                marginPagesDisplayed={3}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="السابق"
                renderOnZeroPageCount={null}
                containerClassName="flex items-center justify-center py-16"
                pageLinkClassName="w-full px-4 py-3 border-t border-b text-base text-white bg-gray-800 hover:bg-gray-600 cursor-pointer text-center"
                nextLinkClassName="w-full px-10 py-3 text-center border text-base rounded-l-xl text-white bg-gray-900 hover:bg-gray-700"
                previousLinkClassName="w-full px-10 py-3 text-center border-t border-b border-x text-base rounded-r-xl text-white bg-gray-900 hover:bg-gray-700"
                breakLinkClassName="w-full px-4 py-3 border-t border-b text-base text-white bg-gray-900 hover:bg-gray-700 cursor-pointer text-center"
                activeClassName='border-x border-black'
            />

        </>
    )
}

export default pagination