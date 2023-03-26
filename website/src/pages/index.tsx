import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import styles from "./index.module.css";

const FeatureList = [
  {
    title: "Pub/Sub data logging",
    image: require("./img/robot.svg").default,
    description:
      "MCAP is ideal for storing multiple channels of heterogeneous log data, such as pub/sub messages or multimodal sensor data.",
  },

  {
    title: "Serialization agnostic",
    image: require("./img/shipment-package.svg").default,
    description:
      "MCAP is a container file, allowing you to record and replay messages encoded in any format, such as Protobuf, ROS, DDS (CDR), JSON, etc.",
  },
  {
    title: "High performance writing",
    image: require("./img/sports-car-convertible.svg").default,
    description:
      "MCAP utilizes a row-oriented, append-only design. This minimizes disk I/O, and reduces the risk of data corruption during an unclean shutdown. ",
  },
  {
    title: "Schema evolution",
    image: require("./img/fantasy-behemoth-dinosaur.svg").default,
    description:
      "MCAP files are fully self-contained, including schemas required to deserialize each channel. Older files always remain readable, even as your codebase evolves.",
  },
  {
    title: "Efficient seeking",
    image: require("./img/turntable.svg").default,
    description:
      "MCAP files contain an optional index, allowing for fast, efficient reading, even over a low-bandwidth internet connection.",
  },
  {
    title: "Optional compression",
    image: require("./img/zip-file.svg").default,
    description:
      "Data can be compressed using lz4 or zstd, while still supporting efficient indexed reads and chunk-based decompression.",
  },
  {
    title: "Multilingual",
    image: require("./img/chat-translate.svg").default,
    description:
      "MCAP libraries are available in many languages, including Rust, C++, Python, Go, TypeScript, and Swift.",
  },
  {
    title: "Flexible",
    image: require("./img/yoga-leg-grab-stretch.svg").default,
    description:
      "Most features, such as chunking, indexing, CRC checksums, and compression are optional. You choose the right tradeoffs for your application.",
  },
  {
    title: "Production ready",
    image: require("./img/army-woman-1.svg").default,
    description:
      "MCAP is the default logging format in ROS 2, and used in production by a wide range of companies, from autonomous vehicles to drones.",
  },
];

function Feature({ title, image, description }) {
  const Image = image;

  return (
    <div className={styles.featureItem}>
      <Image className={styles.featureIcon} role="img" />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const blurb =
    'MCAP (pronounced "em-cap") is an open source container file format for heterogeneous log data. ' +
    "It supports multiple channels of timestamped, serialized data, and is ideal for use in pub/sub " +
    "or robotics applications.";

  return (
    <Layout description={blurb}>
      <header className={styles.hero}>
        <div className="container">
          <img
            src="/img/mcap.webp"
            alt="logo"
            width="240"
            height="180"
            style={{ objectFit: "cover" }}
          ></img>
          <h1>{siteConfig.title}</h1>
          <p>{blurb}</p>
          <Link className="button button--secondary button--lg" to="/guides">
            Get Started
          </Link>
        </div>
      </header>

      <div className={styles.section}>
        <div className="container">
          <div className={styles.featureGrid}>
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
