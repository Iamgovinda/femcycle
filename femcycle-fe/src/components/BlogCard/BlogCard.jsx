import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './BlogCard.module.scss';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
const BlogCard = (props) => {
    return (
        <Card sx={{ maxWidth: 345 }} className={styles['card_parent']}>
            <CardMedia
                component="img"
                height="255"
                image={props.item.image}
                alt="green iguana"
            />
            <CardContent style={{ padding: '16px 0 0 5px' }}>
                <div gutterBottom variant="h5" component="div" className={styles['top_text_info']}>
                    <div><ModeEditOutlineOutlinedIcon fontSize='sm' style={{color:'#FB2E86'}}/> <span>{props.item.author}</span></div> <div> <CalendarMonthOutlinedIcon fontSize='sm' style={{color:'#FFA454'}}/> <span>{props.item.date}</span></div>
                </div>
                <Typography gutterBottom variant="h5" component="div" className={styles['top_text']}>
                    {props.item.topic}
                </Typography>
                <Typography variant="body2" color="text.secondary" className={styles['bottom_text']}>
                    {props.item.description}
                </Typography>
            </CardContent>
            <CardActions style={{ padding: '8px 0 8px 0' }}>
                <Button size="small" className={styles['card_btn']}>Learn More</Button>
            </CardActions>
        </Card>
    )
}

export default BlogCard