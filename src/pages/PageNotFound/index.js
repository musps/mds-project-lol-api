import React from 'react'
import { withRouter } from 'react-router'
import Button from '@atlaskit/button'
import EmptyState from '@atlaskit/empty-state'

const props = {
  header: '404 - Page Not Found',
  description: `Lorem ipsum is a pseudo-Latin text used in web design, 
        typography, layout, and printing in place of English to emphasise 
        design elements over content. It's also called placeholder (or filler) 
        text. It's a convenient tool for mock-ups.`,
}

const PageNotFound = ({ history }) => <EmptyState
  header={props.header}
  description={props.description}
  primaryAction={<Button
    appearance='primary'
    onClick={() => history.push('/')}
  >Go back home</Button>}
/>

export default withRouter(PageNotFound)
