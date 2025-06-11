import { Row } from '@/components/grid/row'

import classes from './styles.module.scss'

export function Home() {
  return (
    <div className={classes.home}>
      <h1 className={classes.title}>Home</h1>
      <Row wrap="wrap" direction="row" gap={0} align="stretch" justify="start">
        <div style={{ width: '50%' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi culpa
          debitis delectus architecto, odit aliquam, voluptatem sint molestiae
          omnis nihil dignissimos maxime nemo obcaecati impedit accusantium
          veniam porro cupiditate? Tenetur.
        </div>
        <div style={{ width: '50%' }}>Col 2</div>
        <div style={{ width: '50%' }}>Col 3</div>
        <div style={{ width: '50%' }}>Col 4</div>
      </Row>

      <Row>
        <div style={{ width: '50%' }}>Col 1</div>
        <div style={{ width: '50%' }}>Col 2</div>
        <div style={{ width: '50%' }}>Col 3</div>
        <div style={{ width: '50%' }}>Col 4</div>
      </Row>
    </div>
  )
}
