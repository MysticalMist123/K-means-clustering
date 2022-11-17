export class tools{
    draw_Rect(ctx,pos,w,h,color){
        ctx.beginPath();
        ctx.rect(pos.x, pos.y, w, h);
        ctx.fillStyle = color
        ctx.fill();
    }
    draw_Ellipse(ctx,pos,a,b,color,rotation = 0,start_angle = 0,end_angle = 2*Math.PI){
        ctx.beginPath();
        ctx.ellipse(pos.x, pos.y, a, b, rotation,start_angle,end_angle);
        ctx.fillStyle = color
        ctx.fill();
    }
    draw_Stroke_Rect(ctx,pos,w,h,color){
        ctx.beginPath();
        ctx.rect(pos.x, pos.y, w, h);
        ctx.strokeStyle = color
        ctx.stroke();
    }
    draw_Stroke_Ellipse(ctx,pos,a,b,color,rotation = 0,start_angle = 0,end_angle = 2*Math.PI){
        ctx.beginPath();
        ctx.ellipse(pos.x, pos.y, a, b, rotation,start_angle,end_angle);
        ctx.strokeStyle = color
        ctx.stroke();
    }
    draw_Line(ctx,pos1,pos2,color){
        ctx.beginPath();
        ctx.moveTo(pos1.x, pos1.y);
        ctx.lineTo(pos2.x, pos2.y);
        ctx.strokeStyle = color
        ctx.stroke();
    }
}