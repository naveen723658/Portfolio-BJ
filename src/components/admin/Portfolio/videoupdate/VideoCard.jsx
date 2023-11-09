import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function VideoCard(option) {
  const { item, key, setSelectedData } = option.option;

  return (
    <Card sx={{ maxWidth: 345 }} key={item.id}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={item?.thumbnailUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {item.videoTitle}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/admin/video/edit/${item.id}`}>Edit</Link>
        <Button
          size="small"
          onClick={(e) => {
            e.preventDefault();
            setSelectedData(item.id);
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
