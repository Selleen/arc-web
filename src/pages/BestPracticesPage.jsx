import React from "react";

function BestPracticesPage() {
  return (
    <main className="section" id="best-practices">
      <h2>Best Practices for Preservation of Software-Based Art</h2>

      <p>
        This document summarizes established strategies from the field of
        software-based art conservation, with a focus on long-term durability,
        access, and cultural stewardship of digital artworks.
      </p>

      {/* 1. Documentation */}
      <h3>1. Comprehensive Documentation</h3>
      <ul>
        <li>Record artwork title, artist, year, and context of creation.</li>
        <li>
          Document technical requirements: operating system, frameworks,
          libraries, software versions, hardware dependencies.
        </li>
        <li>
          Provide build/run instructions, including compilation or installation
          steps.
        </li>
        <li>
          Describe intended behavior, appearance, and user experience to support
          curatorial interpretation.
        </li>
        <li>
          Store all documentation in a centralized and accessible repository.
        </li>
      </ul>

      {/* 2. Preservation of software artifacts */}
      <h3>2. Preservation of Original Software Artifacts</h3>
      <ul>
        <li>
          Preserve original source code, executables, scripts, assets, and
          configuration files.
        </li>
        <li>
          Create disk images (bit-level copies) of storage devices when possible.
        </li>
        <li>
          Maintain archive copies in secure, redundant storage.
        </li>
        <li>
          Record checksums or other integrity metadata to detect corruption.
        </li>
      </ul>

      {/* 3. Emulation / Virtualization */}
      <h3>3. Emulation and Environment Recreation</h3>
      <ul>
        <li>
          Use emulation or virtual machines to replicate original systems as
          hardware becomes obsolete.
        </li>
        <li>
          Maintain both "historical" and "functional" versions of environments.
        </li>
        <li>
          Document the configuration of emulated environments for future reuse.
        </li>
      </ul>
      {/* 4. Maintenance and Re-evaluation */}
      <h3>4. Continuous Maintenance and Review</h3>
      <ul>
        <li>Monitor technological obsolescence and plan migration proactively.</li>
        <li>Test works periodically to ensure functionality.</li>
        <li>
          Version updates carefully, preserving historical snapshots when
          possible.
        </li>
        <li>
          Document any modifications made in the interest of longevity or
          accessibility.
        </li>
      </ul>

      <p>
        Effective preservation of software-based artworks requires both technical
        rigor and curatorial sensitivity. It is an ongoing process that protects
        cultural value by ensuring that digital works remain accessible,
        interpretable, and authentic over time.
      </p>
    </main>
  );
}

export default BestPracticesPage;
