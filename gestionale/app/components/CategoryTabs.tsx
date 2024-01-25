import React from 'react'
import Link from "next/link";

const CategoryTabs = () => {
    return (
      <div className="d-flex gap-1">
                <Link href="/search/students" id="students" className="bg-primary col-2 py-2 rounded-top text-center text-white text-decoration-none">Students</Link>
                <Link href="/search/workers" id="workers" className="bg-primary col-2 py-2 rounded-top text-center text-white text-decoration-none">Workers</Link>
      </div>
    )
  }
  
export default CategoryTabs