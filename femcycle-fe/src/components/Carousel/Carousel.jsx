import React from 'react';
import Carousel from 'react-material-ui-carousel';
import Item from './CItem';
import styles from './Carousel.module.scss';

const MyCarousel = (props) => {
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        }
        // },
        // {
        //     name: "Random Name #1",
        //     description: "Probably the most random thing you have ever seen!"
        // },
        // {
        //     name: "Random Name #1",
        //     description: "Probably the most random thing you have ever seen!"
        // }
    ]

    return (
        <Carousel className={styles['parent']} autoPlay={true}>
            {
                props?.items?.map((item, i) => <Item key={i} item={item} />)
            }
        </Carousel>
    )
}

export default MyCarousel