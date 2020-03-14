import React, { Component } from 'react';
import * as THREE from "three";
import MTLLoader from "three-mtl-loader";
import OBJLoader from "three-obj-loader";
import OrbitControls from "three-orbitcontrols";
OBJLoader(THREE);

class LoadObject extends Component{
    constructor(props){
        super(props);
        this.video = React.createRef();
    }

    componentDidMount(){
        const width = this.mount.clientWidth
        const height = this.mount.clientHeight
        //ADD SCENE
        this.scene = new THREE.Scene();
        //ADD CAMERA
        this.camera = new THREE.PerspectiveCamera(75,width / height,0.1, 1000);
        
        //ADD RENDERER
        this.renderer = new THREE.WebGLRenderer({  antialias: true,alpha: true });
        this.renderer.setClearAlpha(0.0);
        //this.renderer.setClearColor( 0x000000, 0 ); // the default
        //this.renderer.setClearColor('#000000')
        this.renderer.setSize(width, height)
        this.mount.appendChild(this.renderer.domElement)
        this.camera.position.z = 25;
        //this.camera.position.x  =   0;
       
        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.enableZoom=true;

        //ADD CUBE WITH TEXTURE        
        /*var geometryCubeWithTexture = new THREE.BoxBufferGeometry( 50, 50, 50 );
        var texture = new THREE.TextureLoader().load( 'textures/crate.gif' );
        var materialWithTexture = new THREE.MeshBasicMaterial( { map: texture } );   
        this.cubeTexture = new THREE.Mesh(geometryCubeWithTexture, materialWithTexture)
        this.cubeTexture.position.x=-60;
        this.cubeTexture.position.y=-60;
        this.scene.add(this.cubeTexture);
        */
       /*
        var ambientLight = new THREE.AmbientLight( 0x000000,1 ); // soft white light
        this.scene.add( ambientLight);

        var directionalLight = new THREE.DirectionalLight( 0x7799b6, 0.75 );
        this.scene.add( directionalLight );

        var directionalLight2 = new THREE.DirectionalLight( 0xe5d4b4, 0.85 );
        this.scene.add( directionalLight2 );
        
        var directionalLight3 = new THREE.DirectionalLight( 0xfffbf4, 1 );
        this.scene.add( directionalLight3 );       
        */
        //CUSTOM CUBE
        /*this.THREE = THREE;
        var mtlLoader = new MTLLoader();
        mtlLoader.setTexturePath("obj/");
        mtlLoader.setPath("obj/");
        var name ="fox/low-poly-fox-by-pixelmannen";
        var self= this;
        var objectSize=0.2;
        mtlLoader.load(name+".mtl",function(materials){
            materials.preload();
            var objLoader  = new self.THREE.OBJLoader();
            objLoader.setPath("obj/");
            objLoader.load(name+".obj",function(object){
                object.scale.set(objectSize,objectSize,objectSize);
                object.position.y-=5; 
                object.rotateZ(0.1);
                object.rotateY(1);
                self.scene.add(object);
            });
        });
        */
        
        //CUSTOM CUBE
        let path  ="obj/fox/"
        this.THREE = THREE;
        var mtlLoader = new MTLLoader();
        //mtlLoader.setTexturePath("obj/");
        mtlLoader.setPath(path);

        var self= this;
        var objectSize=0.2;
        let objectName= "fox";
        mtlLoader.load(objectName+".mtl",function(materials){
            materials.preload();
            var objLoader  = new self.THREE.OBJLoader();
            objLoader.setPath(path);
            objLoader.load(objectName+".obj",function(object){
                object.scale.set(objectSize,objectSize,objectSize);
                object.position.y-=2;
                self.scene.add(object);
            });
        });

        /*var lights = [];
        lights[0] = new THREE.PointLight(0x304ffe, 1, 0);
        lights[1] = new THREE.PointLight(0xffffff, 1, 0);
        lights[2] = new THREE.PointLight(0xffffff, 1, 0);
        lights[0].position.set(0, 200, 0);
        lights[1].position.set(100, 200, 100);
        lights[2].position.set(-100, -200, -100);
        this.scene.add(lights[0]);
        this.scene.add(lights[1]);
        this.scene.add(lights[2]);
        */

        //ADD optimus
        /*
        this.THREE = THREE;
        const objLoader = new this.THREE.OBJLoader();
        let self =  this;
        objLoader.load("obj/P1-9-freedom.obj",
            function(object) {
                object.scale.set(1,1,1);
                object.position.x=60;
                object.position.y=-60;
                self.scene.add(object);
            },
            function(xhr) {
              console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
            },
            function(error) {
              console.log("An error happened" + error);
            }
        );
        var lights = [];
        lights[0] = new THREE.PointLight(0x304ffe, 1, 0);
        lights[1] = new THREE.PointLight(0xffffff, 1, 0);
        lights[2] = new THREE.PointLight(0xffffff, 1, 0);
        lights[0].position.set(0, 200, 0);
        lights[1].position.set(100, 200, 100);
        lights[2].position.set(-100, -200, -100);
        this.scene.add(lights[0]);
        this.scene.add(lights[1]);
        this.scene.add(lights[2]);
        */
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

export default LoadObject;