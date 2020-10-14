import React from 'react'
import { Alert } from 'react-bootstrap'

// Props.children is just what will show between the opening and closing tag of the component like this
// <Message variant={'danger'}> !Whatever is placed here will be passed as props.children! </Message>

const Message = ({ variant, children }) => {
	return <Alert variant={variant}>{children}</Alert>
}

// Info === blue color
Message.defaultProps = {
	variant: 'info',
}

export default Message
