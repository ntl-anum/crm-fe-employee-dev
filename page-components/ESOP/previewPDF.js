// components/SOPDocument.js
import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 11, fontFamily: "Helvetica" },
  titleRow: {
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    padding: 8,
    fontWeight: "bold",
  },
  table: {
    display: "table",
    width: "auto",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 10,
  },
  row: { flexDirection: "row" },
  cellKey: {
    width: "40%",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    padding: 5,
    fontWeight: "bold",
  },
  cellValue: { width: "60%", borderBottomWidth: 1, padding: 5 },
  sectionTitle: {
    fontSize: 14,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  clauseContainer: {
  marginBottom: 10,
  paddingLeft: 15,
  breakInside: "avoid", // stops splitting
},
});



const PreviewPDF = ({ sop, historyData,rolesData,escalationData,clauseData,annexures }) => {
    console.log("clausesData data is:",clauseData);
    console.log("historyData is:",historyData);
    // Recursive renderer for hierarchical clauses
const buildHierarchy = (clauses) => {
  const map = {};
  const roots = [];

  // Index all clauses
  clauses.forEach((item) => {
    map[item.id] = { ...item, children: [] };
  });

  // Build tree
  clauses.forEach((item) => {
    if (item.parent_id) {
      map[item.parent_id]?.children.push(map[item.id]);
    } else {
      roots.push(map[item.id]);
    }
  });

  // Recalculate seq for preview
  const assignSeq = (nodes, prefix = "") => {
    nodes.forEach((node, index) => {
      // for root → force seq to start with .1
      if (!prefix) {
        node.previewSeq = `${node.seq}.1`;
      } else {
        node.previewSeq = `${prefix}.${index + 1}`;
      }
      if (node.children?.length) {
        assignSeq(node.children, node.previewSeq);
      }
    });
  };

  assignSeq(roots);
  return roots;
};

// Usage
const previewData = buildHierarchy(clauseData);
// Add this inside your PreviewPDF component, just before return

// Recursive clause renderer
const renderClauses = (nodes, sectionNumber, level = 1) => {
  if (!nodes || !nodes.length) return null;

  return nodes.map((node, idx) => {
    // Generate sequence: sectionNumber + "." + idx+1 (+ deeper levels)
    const currentSeq = level === 1 
      ? `${sectionNumber}.${idx + 1}` 
      : `${sectionNumber}.${idx + 1}`;

    return (
      <View key={node.id}   style={[styles.clauseContainer, { marginLeft: level * 10, marginBottom: 4 }]}
      wrap={false}>
        <Text>
          {currentSeq} {node.text}
        </Text>

        {node.children &&
          node.children.length > 0 &&
          renderClauses(node.children, currentSeq, level + 1)}
      </View>
    );
  });
};




  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        {/* SOP Info */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>{sop.sop_name}</Text>
        </View>

        <View style={styles.table}>
          {[
            ["Owner Department", sop.ownerDepartment],
            ["Sub-Department", sop.subDepartment],
            ["Prepared By", sop.preparedBy],
            ["Criticality Level", sop.criticalityLevel],
            ["Information Classification", sop.informationClassification],
            ["Manual Required", sop.manualRequired],
            ["Version", sop.version],
            ["Status", sop.status],
            ["Reviewed Stakeholders", sop.reviewed_stakeholders],
            ["Stakeholders", sop.stakeholders],
            ["Date of Approval", sop.dateOfApproval],
            ["City", sop.city],
            ["Objective", sop.documentobjective],
          ].map(([key, value], idx) => (
            <View style={styles.row} key={idx}>
              <Text style={styles.cellKey}>{key}</Text>
              <Text style={styles.cellValue}>{value}</Text>
            </View>
          ))}
        </View>

        {/* History Table */}
        <Text style={styles.sectionTitle}>Document History</Text>
        <View style={[styles.table,styles.clauseContainer]}>
          {/* Header Row */}
          <View style={styles.row}>
            <Text style={styles.cellKey}>Version</Text>
            <Text style={styles.cellKey}>Prepared By</Text>
            <Text style={styles.cellKey}>Approved By</Text>
            <Text style={styles.cellKey}>Date of Approval</Text>
            <Text style={styles.cellKey}>Significant Changes</Text>
          </View>

          {/* Data Rows */}
          {(historyData || [
            {
              version: "1.0",
              preparedBy: sop.preparedBy,
              approvedBy: "N/A",
              dateOfApproval: sop.dateOfApproval,
              changes: "Initial Creation",
            },
          ]).map((h, idx) => (
            <View style={styles.row} key={idx}>
              <Text style={styles.cellValue}>{h.version}</Text>
              <Text style={styles.cellValue}>{h.preparedBy}</Text>
              <Text style={styles.cellValue}>{h.approvedBy}</Text>
              <Text style={styles.cellValue}>{h.datetime}</Text>
              <Text style={styles.cellValue}>{h.changes}</Text>
            </View>
          ))}
          </View>

        {/* Fixed Sections (common to both Process & Service) */}
        {/* Scope Section */}
     <Text style={styles.sectionTitle}>1. Scope</Text>
    {renderClauses(previewData.filter((c) => c.sectionName === "Definition"), 1)}

    <Text style={styles.sectionTitle}>2. Definition</Text>
    {renderClauses(previewData.filter((c) => c.sectionName === "Definition"), 2)}

    <Text style={styles.sectionTitle}>3. Process Flow</Text>
    {renderClauses(previewData.filter((c) => c.sectionName === "Definition"), 3)}

            {/* Conditional Sections */}
        {sop.sop_type === "process" ? (
          <>
               <Text style={styles.sectionTitle}>4. Process Explanation</Text>
    {renderClauses(previewData.filter((c) => c.sectionName === "Process Explanation"), 4)}

   {/* Role & Responsibility Section */}
    <Text style={styles.sectionTitle}>5. Roles and Responsibility</Text>
    <View style={[styles.table,styles.clauseContainer]} wrap={false}>

    {/* Header Row */}
    <View style={styles.row}>
        <Text style={[styles.cellKey, { flex: 1 }]}>Department</Text>
        <Text style={[styles.cellKey, { flex: 3 }]}>Responsibility</Text>
    </View>

    {/* Data Rows */}
    {(rolesData || [
        { dept: 'ES', responsibility: 'xyz' },
        { dept: 'HR', responsibility: 'Ensure compliance' },
    ]).map((h, idx) => (
        <View style={styles.row} key={idx}>
        <Text style={[styles.cellValue, { flex: 1 }]}>{h.dept}</Text>
        <Text style={[styles.cellValue, { flex: 3 }]}>{h.responsibility}</Text>
        </View>
    ))}
    </View>

              {/* Escalation section */}
        <Text style={styles.sectionTitle}>6. Escalation Matrix</Text>
        <View style={[styles.table,styles.clauseContainer]} wrap={false}>

          {/* Header Row */}
          <View style={styles.row}>
            <Text style={styles.cellKey}>Level</Text>
            <Text style={styles.cellKey}>Designation</Text>
            <Text style={styles.cellKey}>Duration</Text>

          </View>

          {/* Data Rows */}
          {(escalationData || [
            {
              level: 'Level 1',
              designation: 'Assistant Manager',
              duration: '20 days',

            },
          ]).map((h, idx) => (
            <View style={styles.row} key={idx}>
              <Text style={styles.cellValue}>{h.level}</Text>
              <Text style={styles.cellValue}>{h.designation}</Text>
              <Text style={styles.cellValue}>{h.duration}</Text>

            </View>
          ))}
          </View>

            {/* Logs Maintenance Section */}
            <Text style={styles.sectionTitle}>7. Logs Maintenance</Text>
            {renderClauses(previewData.filter((c) => c.sectionName === "Logs Maintenance"), 7)}

                        {/* KPI Monitoring Section */}
            <Text style={styles.sectionTitle}>8. KPI Monitoring</Text>
            {renderClauses(previewData.filter((c) => c.sectionName === "KPI Monitoring"), 8)}

                        {/* KPI Monitoring Section */}
            <Text style={styles.sectionTitle}>9. Reporting</Text>
            {renderClauses(previewData.filter((c) => c.sectionName === "Reporting"), 9)}

                      {/* KPI Monitoring Section */}
            <Text style={styles.sectionTitle}>10. Technical Limitations</Text>
            {renderClauses(previewData.filter((c) => c.sectionName === "Technical Limitations"), 10)}

            {/* Compliance Section 1 */}
            <Text style={styles.sectionTitle}>
            {sop.sop_type === "service" ? "16. Compliance (Non editable)" : "11. Compliance (Non editable)"}
            </Text>
            <View style={styles.clauseContainer}>
            <Text style={styles.clauseText}>
                {sop.sop_type === "service" ? "16.1 " : "11.1 "}
                This SOP will be officially monitored for compliance by the Owner Department and R&PA. 
                They can verify compliance through various methods, including but not limited to, random inspections, 
                business tool reports, internal and external audits, and feedback to them.
            </Text>
            </View>

            {/* Compliance Section 2 */}
            <Text style={styles.sectionTitle}>
            {sop.sop_type === "service" ? "17. Compliance (Non editable)" : "12. Compliance (Non editable)"}
            </Text>
            <View style={styles.clauseContainer}>
            <Text style={styles.clauseText}>
                {sop.sop_type === "service" ? "17.1 " : "12.1 "}
                This SOP will be officially monitored for compliance by the Owner Department and R&PA. 
                They can verify compliance through various methods, including but not limited to, random inspections, 
                business tool reports, internal and external audits, and feedback to them.
            </Text>
            </View>

            {/* Compliance Section 3 */}
            <Text style={styles.sectionTitle}>
            {sop.sop_type === "service" ? "18. Compliance (Non editable)" : "13. Compliance (Non editable)"}
            </Text>
            <View style={styles.clauseContainer}>
            <Text style={styles.clauseText}>
                {sop.sop_type === "service" ? "18.1 " : "13.1 "}
                The owner department must check and, if necessary, update the document at least once a year.
            </Text>
            </View>

          </>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Service Specific Sections</Text>
            {/* Example service fields */}
            <View style={styles.table}>
              <View style={styles.row}>
                <Text style={styles.cellKey}>Escalation Matrix</Text>
                <Text style={styles.cellValue}>
                  {escalationData?.map((e) => e.name).join(", ") || "N/A"}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cellKey}>Annexures</Text>
                <Text style={styles.cellValue}>{annexures?.length || 0} Annexures</Text>
              </View>
            </View>
          </>
        )}

      </Page>
    </Document>
  );
};

export default PreviewPDF;
