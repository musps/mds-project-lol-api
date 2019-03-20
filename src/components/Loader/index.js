import React from 'react'
import { Icon, Segment, Dimmer, Loader, Image } from 'semantic-ui-react'
import './index.scss'

const LoaderComponent = () =>  (
  <div className='loaderComponent'>
    <Loader active inline='centered' size='massive'>
      Loading
    </Loader>
  </div>
)

export default LoaderComponent
