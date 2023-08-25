import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function VideoCard(option) {
    const { item, key, loading = true } = option.option;

  return (
    <Card sx={{ maxWidth: 345 }} key={item.id}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://bgupta.vercel.app/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fbrijesh-kumar-96397.appspot.com%2Fo%2FImages%252FLyhFEvnCELMogCPoocpA%3Falt%3Dmedia%26token%3D115ef18a-5984-4976-844f-db8bdd16a72b&w=640&q=75"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {item.videoTitle}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}
