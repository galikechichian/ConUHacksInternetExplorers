function About() {
    return (
        <div
            className="intro"
            style={{
                backgroundImage: "url('banner.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100vw 100vh",
                margin: "0",
            }}
        >
            <div
                style={{
                    marginInline: "10%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 30,
                }}
            >
                <h1>
                    Behind the Cybersecurity Checklist are the world renowned
                    The Internet Explorers.{" "}
                </h1>
                <h2>
                    {" "}
                    Established in 2023, The Internet Explorers have a mission
                    to ensure that every online user is immune against cyber
                    attacks.
                </h2>
            </div>
        </div>
    );
}

export default About;
