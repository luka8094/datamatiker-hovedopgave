<script>
    import {onMount, beforeUpdate, afterUpdate} from "svelte"

    let background,
    perceptronsHolder,
    mouse = {
        x: null,
        y: null
    }
    
    afterUpdate(() => {
        let context = background.getContext("2d")
        perceptronsHolder = []
        
        //mouse.radius = (context.height / 10) * (context.width / 10
        
        let amountOfPerceptrons = 100

        class Perceptron{
            constructor(x, y, directionX, directionY, size, color){
                this.x = x 
                this.y = y
                this.directionX = directionX 
                this.directionY = directionY 
                this.size = size
                this.color = color
            }

            draw(){
                context.beginPath()
                context.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
                context.fillStyle = "#ffffff"
                context.fill()
            }

            update(){
                if(this.x > context.width || this.x < 0) this.directionX = -this.directionX
                if(this.y > context.height || this.y < 0) this.directionY = -this.directionY
                
                let dx = mouse.x - this.x 
                let dy = mouse.y - this.y 
                
                let distance = Math.sqrt(dx * dx + dy * dy)
                
                /*
                if(distance < mouse.radius + this.size){
                    if(mouse.x < this.x && this.x < context.width - this.size * 10) this.x += 10
                    if(mouse.x < this.x && this.x > this.size * 10) this.x -= 10
                    if(mouse.y < this.y && this.y < context.width - this.size * 10) this.y += 10
                    if(mouse.y < this.y && this.y > this.size * 10) this.y -= 10
                }
                */

                this.x += this.directionX
                this.y += this.directionY

                this.draw()
            }
        }

        function connect(){
            for(let a = 0; a < perceptronsHolder.length; a++){
                for(let b = a; b < perceptronsHolder.length; b++){
                    let distance = 
                    ((perceptronsHolder[a].x) - (perceptronsHolder[b].x) *
                    (perceptronsHolder[a].x - perceptronsHolder[b].x)) +
                    ((perceptronsHolder[a].y - perceptronsHolder[b].y) *
                    (perceptronsHolder[a].y - perceptronsHolder[b].y))

                    if(distance < (context.width / 7) * (context.height / 7)){
                        context.strokeStyle = "#D8D8D8"
                        context.lineWidth = .2

                        context.beginPath()
                        context.moveTo(perceptronsHolder[a].x, perceptronsHolder[b].y)
                        context.lineTo(perceptronsHolder[b].x, perceptronsHolder[a].y)
                        context.stroke()
                    }
                }
            }
        }

        for(let i = 0; i < amountOfPerceptrons; i++){
            let size = 5
            let x = (Math.random() * ((innerWidth - size * 2)) - (size * 2)) + (size * 2)
            let y = (Math.random() * ((innerHeight - size * 2)) - (size * 2)) + (size * 2)
            let directionX = (Math.random() * 5) - 2.5
            let directionY = (Math.random() * 5) - 2.5
            let color = "#D8D8D8"
    
            perceptronsHolder.push(new Perceptron(x, y, directionX, directionY, size, color))
        }

        function animate(){
            requestAnimationFrame(animate)

            context.clearRect(0,0, innerWidth, innerHeight)
    
            for(let i = 0; i < perceptronsHolder.length; i++){
                perceptronsHolder[i].update()
            }
            
            connect()
        }
    
        animate()
    })
</script>

<canvas bind:this={background}>
</canvas>

<style>
    canvas{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -2;
    }
</style>