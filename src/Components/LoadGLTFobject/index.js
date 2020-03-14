import React, { Component } from 'react';
import * as THREE from "three";
import OBJLoader from "three-obj-loader";
import OrbitControls from "three-orbitcontrols";
import GLTFLoader from 'three-gltf-loader';

OBJLoader(THREE);

class LoadGLTFobject extends Component{
    constructor(props){
        super(props);
        this.video = React.createRef();
    }

    componentDidMount(){
        const width = this.mount.clientWidth
        const height = this.mount.clientHeight
        this.scene = new THREE.Scene(); //ADD SCENE
        this.camera = new THREE.PerspectiveCamera(75,width / height,0.1, 1000); //ADD CAMERA        
        this.renderer = new THREE.WebGLRenderer({  antialias: true,alpha: true });//ADD RENDERER
        this.renderer.setClearAlpha(0.0);
        this.renderer.setSize(width, height)
        this.mount.appendChild(this.renderer.domElement)
        this.camera.position.z = 25;
       
        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.enableZoom=true;

        this.setLigh();
        this.setObject();
        this.start();    
        this.showVideo();
    }

    setObject=()=>{
        //let name="https://s3-us-west-2.amazonaws.com/s.cdpn.io/39255/ladybug.gltf";
        let name="obj/emojilove.gltf";
        var loader = new GLTFLoader();
        loader.load(name, (object) => {
            /*TweenMax.from( object.position, 3, {
                y: -8,
                yoyo: true,
                repeat: -1,
                ease: 'Power2.easeInOut'
              });*/
            this.scene.add(object.scene);
        });
    }

    setLigh=()=>{
        var light = new THREE.PointLight( 0xffffcc, 20, 200 ); // color, intensity, distance
        //light.position.set( 4, 30, -20 );
        this.scene.add( light );

        var light2 = new THREE.AmbientLight( 0x20202A, 20, 100 ); // color, intensity
        light2.position.set( 30, -10, 30 );
        this.scene.add( light2 );
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

export default LoadGLTFobject;