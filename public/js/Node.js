class Node {
    constructor(x = 0, y = 0, w = 50, h = 50, name = "", timer = {enabled: false, time: {h: 0, m: 0}}, color = "#FF0000"){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.name = name
        this.timer = timer
        this.color = color
    }

    Update(){
        this.Draw()
    }

    Draw(){
        //Box
        ctx.fillStyle = this.color;
        ctx.strokeStyle = "#FFF";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.closePath();
        //Text BG
        ctx.beginPath();
        ctx.fillStyle = "#3b3b3b";
        ctx.fillRect((this.x + this.w / 2) - ((this.name.length / 2)*10) - 10, this.y - this.h / 1.75, (this.name.length * 10) + 20, 30);
        ctx.closePath();
        //Text
        ctx.beginPath();
        ctx.fillStyle = "#FFF";
        ctx.strokeStyle = "#FFF";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillText(this.name, this.x + this.w / 2, this.y - this.h / 8);
        ctx.closePath();
    }
}