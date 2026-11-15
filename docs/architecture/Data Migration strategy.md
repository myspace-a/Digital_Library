# Digital Library R2 — DL-4: R1-to-R2 Data Migration Strategy

**Decision:** DL-4  
**Status:** APPROVED  
**Scope:** Migration from Digital Library R1 to R2

## 1. Objective

Define a safe, understandable and practical process for transferring existing R1 user data into Digital Library R2.

The migration must protect the original R1 information, allow the user to inspect the data before import, prevent partial imports and provide a clear way to recover from migration problems.

## 2. Existing R1 environment

The current R1 environment has the following characteristics:

- Data is stored in local browser storage.
- Google Drive contains a manually synchronised copy.
- An additional offline copy is available.
- All R1 data can be exported into a single Excel file.
- The application has one user.

The normal migration source will be the Excel export generated from R1.

Google Drive and the offline copy are alternative recovery sources, not interchangeable primary migration sources.

## 3. Approved migration approach

The migration will use an Excel-based, user-controlled process.

The preferred sequence is:

1. Preserve the original R1 data and backup.
2. Export the complete R1 dataset into one Excel file.
3. Prepare the migration file.
4. Upload the file into R2.
5. Validate and preview the contents.
6. Obtain explicit user approval.
7. Execute the import atomically.
8. Generate an import report.
9. Verify the migrated dataset.

### 3.1 Preparing the migration file

Two preparation methods are acceptable:

**Option A — Automatic recognition**

R2 may recognise the original R1 Excel format and automatically convert it into the R2 import structure.

This is a desirable capability but is not mandatory.

**Option B — Manual transformation**

The user may manually adapt the R1 Excel file to the R2 import structure.

If this method is used, the project must provide clear mapping instructions explaining:

- R1-to-R2 field correspondence.
- Required column renaming.
- Value transformations.
- Fields that can remain empty.
- Mandatory fields requiring default values.
- R1 information without an equivalent in R2.
- Information that must be excluded from the final import file.

The original R1 export must remain untouched during manual transformation.

## 4. Data compatibility rules

The R2 data model is not defined by DL-4.

The following principles will apply once that model is established.

### 4.1 R1 information not supported by R2

Information without an equivalent in the R2 model will be handled during manual file transformation.

The prepared import file must contain only information supported by the R2 model.

Unsupported information must be explicitly identified in the mapping instructions rather than silently discarded.

### 4.2 R2 information unavailable in R1

- Optional R2 fields may remain empty.
- Mandatory R2 fields must receive an appropriate default value.
- Default values must be consistent with the R2 requirements.

DL-4 does not define these values.

## 5. Preview and validation

Before the user approves the migration, R2 must analyse the prepared Excel file and present a preview.

The preview must allow the user to understand what will be imported and identify potential problems before the database is modified.

The validation process must distinguish between:

- Valid information ready for import.
- Invalid or incomplete information.
- Warnings requiring attention.
- Information excluded during preparation.
- Mandatory information that cannot be populated.

The exact validation fields and rules will be defined after the R2 requirements and data model are established.

The user must explicitly approve the import before R2 modifies its database.

## 6. Atomic import requirement

The migration must be atomic.

This means that the complete import either succeeds or is not committed.

If the import fails or is interrupted:

- No partial dataset may become permanent.
- Existing R2 data must remain unchanged.
- The application must report the error.
- The user must be able to correct the problem and retry.

This requirement also applies to subsequent Excel imports into an existing R2 dataset.

Implementation must account for interruptions such as browser closure and device shutdown.

## 7. Import reporting

After an import, R2 must provide two reporting levels.

### 7.1 Mobile summary

A concise summary displayed directly in the application.

It should report:

- Total records in the source file.
- Number of records imported.
- Number of records excluded or requiring attention.
- Warnings and errors.
- Overall import status.

### 7.2 Detailed log

An exportable detailed report containing relevant information about the import, including individual errors, affected records and explanations.

The exact report structure will be determined during implementation.

## 8. Recovery and restart

The original R1 data and an independent backup must remain available until R2 is completed and migration has been verified.

If migration must be repeated, restarting the complete import is acceptable.

R2 must provide a safe option to erase the entire dataset and start again.

The erase operation must:

- Require explicit user confirmation.
- Clearly explain the consequences.
- Protect independent recovery copies.
- Allow the user to restart the complete import.

Partial repair and migration-resume functionality are not required by DL-4.

The detailed backup and recovery protection mechanism belongs to DL-5.

## 9. Initial migration and subsequent imports

The initial R1-to-R2 migration will target an empty R2 dataset.

However, the general R2 Excel import mechanism must also support subsequent imports into datasets containing existing records.

The following import principles have been established:

| Situation | Expected behavior |
|---|---|
| New record | Import |
| Existing identical record | Skip |
| Existing different record | Ask the user |
| User chooses to keep existing | Preserve the complete existing record |
| User chooses update | Replace the complete existing record with the imported version |

No silent overwriting is permitted.

These are general R2 import requirements. Detailed duplicate identification and conflict-handling rules must be established separately.

## 10. Testing requirements

Migration implementation must be tested in the Test environment before Production use.

Testing must cover at least:

1. Successful import of a representative R1 dataset.
2. Correct handling of the R1 Excel format, if automatic recognition is implemented.
3. Manual transformation using the mapping instructions.
4. Missing mandatory fields.
5. Invalid and unsupported values.
6. Date and data-format conversion.
7. Correct application of mandatory-field defaults.
8. Import interruption.
9. Browser closure and device shutdown during import.
10. Verification that failed imports leave the dataset unchanged.
11. Successful complete re-import.
12. Safe full-dataset erase and restart.
13. Correct generation of the mobile summary and detailed log.
14. Comparison of source and destination information using the validation criteria defined by R2.

Test data must be representative while respecting DL-2's requirement to avoid unnecessary exposure of Production data.

## 11. Dependencies and related decisions

### DL-2 — Environment strategy

Migration development and testing must use the Cloudflare Test environment before Production migration on GitHub Pages.

### DL-3 — Data-storage architecture

Migration must populate the local IndexedDB database.

No dedicated backend or cloud database is required.

### DL-5 — Backup and disaster recovery

DL-5 must define the detailed mechanisms for:
- Protecting the original data.
- Maintaining recoverable copies.
- Protecting data before destructive operations.
- Recovering from corruption or accidental deletion.

### DL-14 — Cloud synchronisation

The migration process must be considered when defining synchronisation behavior.

The complete synchronisation mechanism remains outside DL-4.

### R2 requirements and data model

The following remain dependencies:

- Final R2 entities and fields.
- Mandatory and optional fields.
- Default values.
- R1-to-R2 field mapping.
- Data transformation rules.
- Validation criteria.
- Treatment of obsolete or unsupported information.

## 12. Implementation implications

Future implementation work must provide:

1. Excel-based migration input.
2. Optional R1 format recognition.
3. Documented manual mapping instructions.
4. Import preview and validation.
5. Explicit user approval.
6. Atomic import execution.
7. Import summary and detailed exportable log.
8. Safe full-dataset erase and restart.
9. General import conflict handling for subsequent imports.

Implementation details must respect the R2 data model and the decisions recorded in DL-2, DL-3, DL-5 and DL-14.

## 13. Decision boundaries

DL-4 does not decide:

- The R2 product requirements.
- The R2 data model.
- The detailed Excel import specification.
- The backup and disaster-recovery architecture.
- The complete cloud synchronisation mechanism.
- The GitHub branching and release strategy.

These topics remain under their respective project decisions.

---

**Final decision:** Digital Library R2 will adopt a user-controlled, Excel-based R1 migration process with preview, validation, explicit approval, atomic import, reporting and full restart capability. Automatic R1 format recognition remains optional.