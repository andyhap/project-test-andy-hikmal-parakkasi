'use client';

import React, { useEffect, useState } from 'react';

interface Post {
    id: number;
    title: string;
    slug: string;
    published_at: string;
    thumbnail: {
        url: string;
        alternativeText: string;
    };
}

const getPaginationRange = (current: number, total: number) => {
    const delta = 2;
    const range = [];
    for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
        range.push(i);
    }
    return range;
};

const ListPost: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [sort, setSort] = useState<string>('-published_at');
    const [totalItems, setTotalItems] = useState<number>(0);

    const totalPages = Math.ceil(totalItems / pageSize);

    useEffect(() => {
        const savedPage = localStorage.getItem('currentPage');
        const savedPageSize = localStorage.getItem('pageSize');
        const savedSort = localStorage.getItem('sort');

        if (savedPage) setCurrentPage(Number(savedPage));
        if (savedPageSize) setPageSize(Number(savedPageSize));
        if (savedSort) setSort(savedSort);
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
        try {
            const res = await fetch(
            `https://suitmedia-backend.suitdev.com/api/ideas?populate=thumbnail&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}&sort=${sort}`,
            {
                headers: {
                Accept: 'application/json',
                },
            }
            );
            const data = await res.json();
            console.log('DATA:', data); // DEBUG LOG

            setPosts(data.data || []);
            const total = data?.meta?.total ?? 0;
            setTotalItems(total);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
        };

        fetchPosts();
    }, [currentPage, pageSize, sort]);

    useEffect(() => {
        localStorage.setItem('currentPage', currentPage.toString());
        localStorage.setItem('pageSize', pageSize.toString());
        localStorage.setItem('sort', sort);
    }, [currentPage, pageSize, sort]);

    return (
        <div className="container py-4">
        {/* Info + Controls */}
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-4 gap-3">
            <div className="text-muted">
                Showing {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalItems)} of {totalItems}
            </div>

            <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center gap-2">
                    <label className="form-label mb-0 small text-muted">Show per page:</label>
                    <select
                    className="form-select form-select-sm"
                    style={{ width: '80px' }}
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(parseInt(e.target.value));
                        setCurrentPage(1);
                    }}
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>

                <div className="d-flex align-items-center gap-2">
                    <label className="form-label mb-0 small text-muted">Sort by:</label>
                    <select
                    className="form-select form-select-sm"
                    style={{ width: '120px' }}
                    value={sort}
                    onChange={(e) => {
                        setSort(e.target.value);
                        setCurrentPage(1);
                    }}
                    >
                        <option value="-published_at">Newest</option>
                        <option value="published_at">Oldest</option>
                    </select>
                </div>
            </div>
        </div>

        {/* Posts */}
        <div className="row">
            {posts.map((post) => (
            <div className="col-md-4 mb-4" key={post.id}>
                <div className="card h-100 shadow-sm">
                    <img 
                    src="/images/thumbnail.jpg"
                    alt={post.title}
                    className="card-img-top"
                    loading="lazy"
                    style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                    </div>
                    <div className="card-footer small text-muted">
                        {new Date(post.published_at).toLocaleDateString()}
                    </div>
                </div>
            </div>
            ))}
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-center align-items-center gap-2 mt-4 flex-wrap">
            <button
            className="btn btn-sm btn-light"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
            >
                «
            </button>
            <button
            className="btn btn-sm btn-light"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
                ‹
            </button>
            {getPaginationRange(currentPage, totalPages).map((page) => (
            <button
                key={page}
                className={`btn btn-sm ${page === currentPage ? 'btn-warning text-white' : 'btn-light'}`}
                onClick={() => setCurrentPage(page)}
            >
                {page}
            </button>
            ))}
            <button
            className="btn btn-sm btn-light"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
                ›
            </button>
            <button
            className="btn btn-sm btn-light"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
            >
                »
            </button>
        </div>
        </div>
    );
};

export default ListPost;
