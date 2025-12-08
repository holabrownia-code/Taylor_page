export default function TempImagesPage() {
    return (
        <div style={{ background: "#333", color: "white", minHeight: "100vh", padding: "20px" }}>
            <h1>Image Identification</h1>
            <div>
                <h2>temp_0.png</h2>
                <img src="/images/temp_0.png" style={{ maxWidth: "300px", border: "1px solid white" }} alt="temp_0" />
            </div>
            <div>
                <h2>temp_1.jpg</h2>
                <img src="/images/temp_1.jpg" style={{ maxWidth: "300px", border: "1px solid white" }} alt="temp_1" />
            </div>
            <div>
                <h2>temp_2.png</h2>
                <img src="/images/temp_2.png" style={{ maxWidth: "300px", border: "1px solid white" }} alt="temp_2" />
            </div>
            <div>
                <h2>temp_3.jpg</h2>
                <img src="/images/temp_3.jpg" style={{ maxWidth: "300px", border: "1px solid white" }} alt="temp_3" />
            </div>
        </div>
    )
}
