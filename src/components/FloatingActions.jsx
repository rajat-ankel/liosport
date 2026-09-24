import React from 'react';
import { appDetails } from '../data/siteData';

const PHONE_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABE5AAAROQEb2ZNGAAAFHGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDI0LTExLTA0VDE0OjU5OjU2KzA1OjMwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyNC0xMS0wNFQxNTowNzoxNCswNTozMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNC0xMS0wNFQxNTowNzoxNCswNTozMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxZWZmM2NmOC1hMTFkLTJjNDctYWRhOC1lYTZhMDRiYWVkOGYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MWVmZjNjZjgtYTExZC0yYzQ3LWFkYTgtZWE2YTA0YmFlZDhmIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MWVmZjNjZjgtYTExZC0yYzQ3LWFkYTgtZWE2YTA0YmFlZDhmIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoxZWZmM2NmOC1hMTFkLTJjNDctYWRhOC1lYTZhMDRiYWVkOGYiIHN0RXZ0OndoZW49IjIwMjQtMTEtMDRUMTQ6NTk6NTYrMDU6MzAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5d1PjGAAACVUlEQVRYhbXXv6sVRxyG8c9Vr5BYiDh/gSYBYzUhCNqL3CJWQSUGNUqaKCooOigWioGVJNhYWYiRSJLi2ggGMYKCBILIBiwSU4hgoeKi+FvQ67U4KyzHc/aco7vfcvaZeZ+dnd2dGZuentZdWV7MwT6sw2V8lWJ48hbYQI11C2R5EfAHPq80n8UXKYYXTQvM6Aqfj/Nd4bACx5sOpzIDWV58iEuINfzXKYaTTQpUZ2DngHA4kOXFjAHM6AJZXszDriH4BZhoXEDnGc8Zss/mNgRGuatP2xD4ZIQ+f7chMDYkfwfb2hAYpv7DshTD7TYEng3gLmBJiuF6k+FVgYs1zHNsSDE8ajq8KnCmhpmJW22EVwUu424fZhyLWxVIMUzjtxpuZasCZX2Px324vVlefNaqQIrhDn7sw43jlywvPmhNoKyfdD42vWoRDrUqkGJ4jB01/JYsL75sUuCtLRlkeXEU3/bpM4WNKYYTdQNnebEAa/AUx1IMD3tx/T7FW/FPn2szcTzLi6014bvxr87CPoxrWV6s7cX2nIFykIW4grn9grAf+8vXWJYXYziC7/rwf2J1iuHeQIFywJWYxKwaiZs4havYhKU1LFzD0hTD/YECpcRqnNSZ+qbqHCZSDFMDf8cpht+xHq8aFFiusz6G2w+UW/GNDUtMDC1QSvyMVXjQkMDkSAKlxKTO2eF994UncJAhFmGvyvJivBxgp9Fu4iX2pBh+eNPwTgIVkYXYjm8MPlfcwNoUw1/VxvcSqIjMwwadx/MRPsZsXMf/+BWnUwxT3X1fAyEYs6F6DBKjAAAAAElFTkSuQmCC";

export default function FloatingActions() {
  return (
    <>
      <div className="wtsp-home">
        <a
          href={appDetails.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="WhatsApp Support"
        >
          <img src="/static/media/Whatsapp.a9fb4e4e7292448d3ff0462d2c7b239b.svg" alt="whatsapp" />
        </a>
      </div>

      <a
        href={`tel:${appDetails.phone}`}
        className="contact-phone"
        title="Contact Phone"
      >
        <div className="icon-box">
          <img
            src={PHONE_ICON}
            alt="phone"
            style={{
              width: '16px',
              height: '16px',
              display: 'block',
              maxWidth: '16px',
              maxHeight: '16px'
            }}
          />
        </div>
      </a>
    </>
  );
}
