import React, { Component } from 'react';
import * as THREE from "three";
import OBJLoader from "three-obj-loader";
import OrbitControls from "three-orbitcontrols";
OBJLoader(THREE);

class Load3DasJSON extends Component{
    constructor(props){
        super(props);
        this.video = React.createRef();
    }

    componentDidMount(){
        const width = this.mount.clientWidth
        const height = this.mount.clientHeight
        this.scene = new THREE.Scene();//ADD SCENE
        this.camera = new THREE.PerspectiveCamera(75,width / height,0.1, 1000); //ADD CAMERA
        this.renderer = new THREE.WebGLRenderer({  antialias: true,alpha: true }); //ADD RENDERER
        this.renderer.setClearAlpha(0.0);        
        this.renderer.setSize(width, height)
        this.mount.appendChild(this.renderer.domElement)
        this.camera.position.z = 25;
        //this.camera.position.x  =   0;
       
        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.enableZoom=true;

        this.THREE = THREE;
        let self = this;
        var loader = new THREE.ObjectLoader();
        loader.load("obj/emojilove.x3d",function ( obj ) {
            console.log("obj",obj);
            self.scene.add( obj.toJSON() );
        });
      
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
        //this.cubeTexture.rotation.x+=0.02;
        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate)
    }

    renderScene = () => {
        this.renderer.render(this.scene, this.camera)
    }
    
    render(){
        return(
            <div style={{position: 'relative'}}>
                <p>https://codesandbox.io/s/kw7l49nw1r</p>
                <div    style={{ width: '500px', height: '500px',position:'absolute', zIndex:100 }}
                        ref={(mount) => { this.mount = mount }}/>

                <video  ref={this.video}
                        autoPlay={true} style={{position:'absolute'}}></video>

            </div>
        )
    }
}

export default Load3DasJSON;