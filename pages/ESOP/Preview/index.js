"use client";

import useURLParams from "@/hooks/useURLParams";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ComplianceService } from "@/services/ComplianceService/ComplianceService";
import { PDFDownloadLink, BlobProvider } from "@react-pdf/renderer";
import PreviewPDF from "@/page-components/ESOP/previewPDF";
import Layout from "@/components/Layout";
import PanelHeading from "@/components/PanelHeading";

export default function PreviewPage() {
  const URLParams = useURLParams();
  const router = useRouter();

  const [sop, setSop] = useState(null);
  const [historyData, setHistoryData] = useState(null);
  const [escalationData, setEscalationData] = useState(null);
  const [rolesData, setRolesData] = useState(null);
  const [clauseData, setClauseData] = useState(null);
  const [annexures, setAnnexures] = useState(null);

  useEffect(() => {
    if (router.isReady && URLParams?.id) {
      const fetchData = async () => {
        try {
          const data1 = await ComplianceService.getSOPDataById(URLParams.id);
          const sopData = await data1.json();
          setSop(sopData.data);

          const data2 = await ComplianceService.getHistoryById(URLParams.id);
          setHistoryData((await data2.json()).data);

          const data3 = await ComplianceService.getEscalationById(URLParams.id);
          setEscalationData((await data3.json()).data);

          const data4 = await ComplianceService.getRolesById(URLParams.id);
          setRolesData((await data4.json()).data);

          const data5 = await ComplianceService.getClausesById(URLParams.id);
          setClauseData((await data5.json()).data);

          const data6 = await ComplianceService.getAnnexureById(URLParams.id);
          setAnnexures((await data6.json()).data);
        } catch (err) {
          console.error("Error fetching preview data:", err);
        }
      };

      fetchData();
    }
  }, [URLParams, router.isReady]);

  const isDataLoaded =
    sop && historyData && escalationData && rolesData && clauseData && annexures;

  return (
    <Layout>
      {/* Force override with inline styles */}
      <div 
        style={{ 
          width: '100%', 
          height: 'calc(100vh - 100px)', 
          display: 'flex', 
          flexDirection: 'column',
          minHeight: '800px'
        }}
      >
        {/* Header with Download Button and Title */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px', 
            padding: '16px', 
            borderBottom: '1px solid #e5e7eb',
            backgroundColor: 'white',
            flexShrink: 0
          }}
        >
          {/* Download Button - Top Left */}
          {isDataLoaded && (
            <PDFDownloadLink
              document={
                <PreviewPDF
                  sop={sop}
                  historyData={historyData}
                  rolesData={rolesData}
                  escalationData={escalationData}
                  clauseData={clauseData}
                  annexures={annexures}
                />
              }
              fileName="SOP_Compliance_Report.pdf"
            >
              {({ loading }) => (
                <button 
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
                >
                  {loading ? "Preparing..." : "Download PDF"}
                </button>
              )}
            </PDFDownloadLink>
          )}
        </div>

        {/* PDF Preview Container with forced dimensions */}
        <div 
          style={{ 
            flex: 1, 
            width: '100%', 
            height: '100%',
            minHeight: '700px',
            overflow: 'hidden',
            backgroundColor: '#f3f4f6'
          }}
        >
          {isDataLoaded ? (
            <BlobProvider
              document={
                <PreviewPDF
                  sop={sop}
                  historyData={historyData}
                  rolesData={rolesData}
                  escalationData={escalationData}
                  clauseData={clauseData}
                  annexures={annexures}
                />
              }
            >
              {({ url, loading, error }) => {
                if (loading) return (
                  <div 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      height: '100%',
                      fontSize: '18px',
                      color: '#6b7280'
                    }}
                  >
                    <p>Generating preview…</p>
                  </div>
                );
                if (error) return (
                  <div 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      height: '100%',
                      fontSize: '18px',
                      color: '#dc2626'
                    }}
                  >
                    <p>Error loading preview</p>
                  </div>
                );
                if (!url) return (
                  <div 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      height: '100%',
                      fontSize: '18px',
                      color: '#6b7280'
                    }}
                  >
                    <p>No preview available</p>
                  </div>
                );
                return (
                  <iframe
                    src={`${url}#toolbar=0&navpanes=0&scrollbar=0&view=Fit&zoom=90`}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      border: 'none',
                      minHeight: '700px',
                      transform: 'scale(1.2)',
                      transformOrigin: 'top center'
                    }}
                    title="SOP Preview"
                  />
                );
              }}
            </BlobProvider>
          ) : (
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '400px',
                fontSize: '18px',
                color: '#6b7280'
              }}
            >
              <p>Loading SOP data…</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}