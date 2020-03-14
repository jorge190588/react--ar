import React, { Component } from 'react';
import * as THREE from 'three';

class Webcam extends Component{
    constructor(props){
        super(props);
        this.video = React.createRef();
    }

    componentDidMount(){
        const width = this.mount.clientWidth
        const height = this.mount.clientHeight
        //ADD SCENE
        this.scene = new THREE.Scene()
        //ADD CAMERA
        this.camera = new THREE.PerspectiveCamera(
        75,
        width / height,
        0.1,
        1000
        );
        
        //ADD RENDERER
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setClearAlpha(0.0);
        //this.renderer.setClearColor('#000000')
        this.renderer.setSize(width, height)
        this.mount.appendChild(this.renderer.domElement)
        this.camera.position.z = 400


        //ADD CUBE WITH TEXTURE        
        var geometryCubeWithTexture = new THREE.BoxBufferGeometry( 50, 50, 50 );
        var texture = new THREE.TextureLoader().load( 'textures/crate.gif' );
        var materialWithTexture = new THREE.MeshBasicMaterial( { map: texture } );   
        this.cubeTexture = new THREE.Mesh(geometryCubeWithTexture, materialWithTexture)
        this.cubeTexture.position.x=60;
        this.cubeTexture.position.y=-60;
        this.scene.add(this.cubeTexture)
        
        this.start();    
        this.showVideo();
    }
    
    showVideo=()=>{
        let self =  this;
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
        if (navigator.getUserMedia) {
            navigator.getUserMedia({video: true}, function(stream){
                self.video.current.srcObject = stream;
                self.video.current.play();
            }, function(err){
                console.log("err",err);
            });
        }

    }
    componentWillUnmount(){
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
    }
    
    start = () => {
        if (!this.frameId) {
        this.frameId = requestAnimationFrame(this.animate)
        }
    }

    stop = () => {
        cancelAnimationFrame(this.frameId)
    }

    animate = () => {
        //this.cubeWithColor.rotation.x += 0.01
        this.cubeTexture.rotation.x+=0.02;
        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate)
    }

    renderScene = () => {
        this.renderer.render(this.scene, this.camera)
    }
    
    render(){
        return(
            <div style={{position: 'relative'}}>
                <div    style={{ width: '500px', height: '500px',position:'absolute', zIndex:100 }}
                        ref={(mount) => { this.mount = mount }}/>

                <video  ref={this.video}
                        autoPlay={true} style={{position:'absolute'}}></video>

            </div>
        )
    }
}

export default Webcam;