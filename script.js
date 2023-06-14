var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// Dessiner un arc

function generateRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
  
    for (var i = 0; i < 6; i++) {
      var randomIndex = Math.floor(Math.random() * letters.length);
      color += letters[randomIndex];
    }
  
    return color;
  }

  /*
for (var i = -100; i < 100; i++)
{
    c.beginPath();
    c.arc(Math.random() * window.innerWidth, Math.random() * window.innerHeight, 10, 0, Math.PI * 2);
    c.strokeStyle = generateRandomColor(); 
    c.stroke();
}
*/

function Circle(x, y, dx, dy, radius){

    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = generateRandomColor();

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.strokeStyle = this.color;
        c.fillStyle = this.color;
        c.stroke();
        c.fill();
    }

    this.update = function(){
        if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.dx *= -1;
        } else if (this.radius + this.x > innerWidth) {
            this.dx *= -1;
            this.x = innerWidth - this.radius;
        }
        
        if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.dy *= -1;
        } else if (this.radius + this.y > innerHeight) {
            this.dy *= -1;
            this.y = innerHeight - this.radius;
        }
        

        this.x += this.dx;
        this.y += this.dy;

        var hit_box = 100;
        var max_size = 100;
        var min_size = Math.random() * 20 + 2;
        var speed_regime = 2;

        if (mouse.x - this.x < hit_box && mouse.x - this.x > -hit_box
            && 
            (mouse.y - this.y < hit_box && mouse.y - this.y > -hit_box))
        {
            if (this.radius < max_size)
                    this.radius += speed_regime;
        }
        else if (this.radius > min_size )
        {
            this.radius -= speed_regime;
        }
    }


}

var number_circle ;
var speed = 5;

var mouse = {
    x: undefined,
    y:undefined
}

window.addEventListener('mousemove',
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
    })

window.addEventListener('resize', function(){
    canvas.height = this.innerHeight;
    canvas.width = this.innerWidth;
    
    init();
})
var circleArray = [];


    function init()
    {
        circleArray = [];
        number_circle = 300 + Math.random() * (innerWidth / 25) * (innerHeight / 25);
        for (var i = 0; i < number_circle; i++)
            {

                var radius = Math.random() * 3 + 1;
                var x = Math.random() * (innerWidth - radius * 2) + radius;
                var y = Math.random() * (innerHeight - radius * 2) + radius;
                var moov_x = (Math.random() - 0.5) * speed;
                var moov_y = (Math.random() - 0.5) * speed;

                circleArray.push(new Circle(x, y, moov_x, moov_y, radius));
            }
    }

    init();

    function animate () {
        window.requestAnimationFrame(animate);
        c.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < circleArray.length; i++)
        {
            circleArray[i].draw();
            circleArray[i].update();
        }

        
    };

    animate();