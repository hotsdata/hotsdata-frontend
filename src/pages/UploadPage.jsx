import { Upload } from "lucide-react";
import { useState } from "react";

import StatusPanel from "../components/common/StatusPanel.jsx";
import DataTable from "../components/data/DataTable.jsx";
import { useUploadReplayMutation } from "../features/hotsdata/hotsdataApi.js";

export default function UploadPage() {
  const [uploadReplay] = useUploadReplayMutation();
  const [uploads, setUploads] = useState([]);

  function handleFiles(event) {
    const files = Array.from(event.target.files || []);
    setUploads((current) => [
      ...current,
      ...files.map((file) => ({
        id: `${file.name}-${file.lastModified}`,
        file,
        filename: file.name,
        progress: 0,
        status: "Ready",
      })),
    ]);
  }

  async function submitUpload(upload) {
    setUploads((current) =>
      current.map((row) =>
        row.id === upload.id
          ? { ...row, progress: 35, status: "Uploading" }
          : row,
      ),
    );

    try {
      await uploadReplay(upload.file).unwrap();
      setUploads((current) =>
        current.map((row) =>
          row.id === upload.id
            ? { ...row, progress: 100, status: "Finished" }
            : row,
        ),
      );
    } catch (error) {
      setUploads((current) =>
        current.map((row) =>
          row.id === upload.id
            ? {
                ...row,
                status: error?.message || "Failed",
                progress: Math.max(row.progress, 35),
              }
            : row,
        ),
      );
    }
  }

  return (
    <section className="content-section">
      <div className="section-header">
        <div>
          <p className="eyebrow">Replay intake</p>
          <h1>Upload replays</h1>
        </div>
      </div>

      <label className="upload-zone">
        <Upload size={30} />
        <span>Choose replay files</span>
        <small>
          Drop support can be added on top of this native file picker without
          changing the API layer.
        </small>
        <input
          type="file"
          multiple
          accept=".StormReplay,.stormreplay"
          onChange={handleFiles}
        />
      </label>

      {uploads.length === 0 ? (
        <StatusPanel
          title="No files queued"
          message="Select one or more replay files to start an upload."
        />
      ) : (
        <DataTable
          columns={[
            { key: "filename", label: "File" },
            {
              key: "progress",
              label: "Progress",
              numeric: true,
              render: (row) => `${row.progress}%`,
            },
            { key: "status", label: "Status" },
            {
              key: "action",
              label: "Action",
              render: (row) => (
                <button
                  type="button"
                  className="button secondary small-button"
                  disabled={
                    row.status === "Uploading" || row.status === "Finished"
                  }
                  onClick={() => submitUpload(row)}
                >
                  Upload
                </button>
              ),
            },
          ]}
          rows={uploads}
        />
      )}
    </section>
  );
}
