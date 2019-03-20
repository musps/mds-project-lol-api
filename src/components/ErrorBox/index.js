import React from 'react'
import Button from '@atlaskit/button'
import EmptyState from '@atlaskit/empty-state'

const PrimaryAction = ({ btnValue, btnOnClick }) => (
  <Button
    appearance="primary"
    onClick={btnOnClick}
  >
    {btnValue}
  </Button>
)

const ErrorBox = ({ title, description, btnValue, btnOnClick }) => (
  <EmptyState
    header={title}
    description={description}
    primaryAction={<PrimaryAction btnValue={btnValue} btnOnClick={btnOnClick} />}
  />
)

export default ErrorBox
