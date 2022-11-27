import React, {FC} from 'react';

import Card, { CardVariant } from '../../Components/Card/Card';
import EventsExample from '../../Components/EventsExample/EventsExample';

const EventsPage: FC = () => {
  return (
    <div style={{display: 'inline-flex'}}>
      <div>
        <h2>Card</h2>
        <Card
          variant={CardVariant.outlined}
          width='200px'
          height='50px'
          onClick={(num) => console.log('clicked', num)}
        >
          <button>Children Prop Кнопка</button>
          <div>Children Prop текст</div>
        </Card>
      </div>

      <div style={{marginLeft: 30}}>
        <h2>Events typification</h2>
        <EventsExample />
      </div>
    </div>
  );
}

export default EventsPage;