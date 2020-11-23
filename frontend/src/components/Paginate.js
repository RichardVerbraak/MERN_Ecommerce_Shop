import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

// If there are multiple pages of products, render Pagination
// Map through the number of pages to create the page links
// [1, 2, 3, 4] instead of [1234] with [...Array(pages).keys()], create an array with the length equal to the pages, spread out and fill the 'spots' with their index (.keys())
const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
	return (
		pages > 1 && (
			<Pagination>
				{[...Array(pages).keys()].map((x) => {
					return (
						<LinkContainer
							key={x + 1}
							to={
								keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`
							}
						>
							<Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
						</LinkContainer>
					)
				})}
			</Pagination>
		)
	)
}

export default Paginate
