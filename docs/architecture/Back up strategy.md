# DL-5 – Backup Strategy
## Requirements and Decision Record

**Project:** Digital Library R2  
**Decision:** DL-5 – Backup Strategy  
**Status:** Requirements agreed; technical feasibility checks remain open.

## 1. Purpose

Define how Digital Library protects users' libraries against accidental data loss, incorrect operations, device loss and local storage problems.

The backup strategy must be reliable, understandable and manageable by individual users, without requiring a central team to manage backup infrastructure.

The implementation should avoid unnecessary complexity. Full backups and familiar Excel import/export remain preferred over more sophisticated mechanisms.

## 2. Backup architecture and ownership

### 2.1 User ownership

- Each user manages their own backup storage and accounts.
- Digital Library manages backup creation, validation, retention and restoration after the user configures a provider.
- No centrally managed backup infrastructure or shared project account is required.
- Backup storage must be independent of the Cloudflare account and resources used to deploy the Digital Library application.

### 2.2 Supported provider options

The intended provider options are:

- **Google Drive:** simpler connection experience for ordinary users, subject to confirmation that the intended automatic backup integration is permitted by Google's policies.
- **Cloudflare R2:** an advanced option for technically experienced users. Initial setup may require the user to create their own storage resources and configure a Worker.

The application must remain provider-independent, allowing different storage providers to be integrated without redesigning the core backup process.

### 2.3 Multiple providers

- Users may activate more than one backup provider.
- Each backup is sent to every active provider.
- Each provider maintains its own independent backup history.
- A failure in one provider must not prevent backups to another working provider.

## 3. Backup types and format

### 3.1 Native application backup

- Every native backup contains the complete library at the time of creation.
- Each backup must be independently restorable.
- Incremental backups are not required.
- The native format must contain all information required for complete application recovery.
- The precise contents and structure will depend on the future R2 data model.

### 3.2 Excel export

Excel export remains an independent mechanism for:
- Inspecting library data.
- Obtaining a human-readable copy.
- Manually preserving data.
- Supporting recovery through manual import where appropriate.

An Excel export is not necessarily a complete substitute for a native application backup.

### 3.3 Backup version identification

Each native backup must identify:
- The Digital Library application version that created it.
- The native backup format version.

Restoration is supported **only within the same Digital Library application version**. Cross-version restoration is not supported.

## 4. Backup creation

### 4.1 Automatic backups

- No daily or weekly scheduled backups.
- No automatic backup after ordinary individual record changes.
- Automatic backups are created immediately before agreed risky operations.
- Automatic backups are sent to all eligible active providers.

### 4.2 Manual backups

- Users can create a manual backup whenever they wish.
- Manual backups count towards the retention limit.
- Manual backup creation must be available through Backup Management.

### 4.3 Risky operations

Automatic backup protection is required before:

- Replacing the complete library during synchronisation.
- Importing or migrating a complete dataset.
- Bulk deletion or deletion of a substantial part of the library.
- Other operations that could replace or remove a substantial part of the library.

**Restoration is a special case:** it uses a protective Excel export rather than a cloud backup before replacing the current library.

### 4.4 Definition of bulk deletion

Bulk deletion means an operation that removes:

- The entire library.
- All records belonging to a major section or category.
- A broad group of records selected for deletion through one batch operation.
- Records across multiple dates or sections through one operation.

Ordinary deletion of an individual record does not require an automatic backup.

Exact numerical thresholds will be defined later, once the R2 data model and user interface are established.

## 5. Backup retention

- Retain the five most recent valid backups **per provider**.
- Manual and automatic backups both count towards the five.
- Failed backups do not count as valid backups.
- Each provider maintains its own independent retention history.
- A new backup must be successfully created and validated before an older backup is deleted.
- A failed backup must never cause an older valid backup to be deleted.
- Automatic retention must not remove the last valid backup when a newer backup has not been validated.

Historical backups must remain independent of normal synchronisation. Synchronisation must not overwrite or delete historical backup files.

## 6. Backup validation

Digital Library must distinguish three validation levels:

1. **Creation check:** the backup process completed successfully.
2. **Integrity check:** the stored file can be read and its integrity verified.
3. **Restoration readiness:** the backup contains the information and structure required for restoration by the compatible application version.

A backup must not be presented as fully valid if required validation checks fail.

A separate user-accessible restoration test may be considered. A full restoration test is not required for every backup creation.

## 7. Provider security

- Backup files must be stored privately and must never be publicly accessible.
- Digital Library will rely on the security mechanisms provided by the storage provider.
- Application-level encryption is not required.
- No additional encryption keys or password-management procedures will be introduced by Digital Library.

## 8. Provider failures and availability

### 8.1 Partial failure

When multiple providers are configured:

- The result of each provider's backup operation must be reported separately.
- A successful upload to one provider and a failed upload to another must be reported as a partial success, not a complete success.
- The user must be able to retry a failed backup.
- Other working providers must continue operating.

### 8.2 Suspension of automatic backups

If a provider becomes unavailable, refuses an upload or reaches its storage quota:

- Automatic backups to that provider are suspended.
- The user is informed of the problem.
- Automatic backups to other working providers continue.
- Automatic backups to the affected provider resume only after a successful manual backup to that provider.
- Existing valid backups are never deleted to make room automatically.

The same rules apply to technical errors that prevent a provider from accepting backups.

### 8.3 Risky operations when backup providers fail

- If all eligible providers successfully create and validate the required backup, the risky operation may proceed.
- If at least one provider succeeds, the operation may proceed with a warning identifying the failed provider.
- If all providers fail, or no provider is configured, the operation must stop.
- A provider whose automatic backups are suspended because of an unresolved availability or upload problem is not an eligible provider for the operation.

If all configured providers are unavailable or suspended, the operation must stop and use the manual Excel export fallback.

In the last case:
1. Digital Library asks the user to perform a manual Excel export.
2. The application verifies that the export completed successfully.
3. It asks the user for explicit approval before proceeding.
4. The risky operation proceeds only after that approval.

## 9. Restoration

### 9.1 Restoration process

1. Display available backups from connected providers.
2. Show relevant information, including date, provider and validation status.
3. Allow the user to select a backup.
4. Check application-version compatibility.
5. Validate the selected backup.
6. Export the current library to an Excel file.
7. Verify that the protective Excel export completed successfully.
8. Ask the user for explicit confirmation to replace the current library.
9. Restore the selected backup.
10. Report the restoration result.

### 9.2 Restoration safeguards

- If the protective Excel export fails, restoration must stop.
- The current library must remain unchanged if restoration cannot proceed.
- Restoration replaces the complete dataset; it does not merge records.
- Restoration must not create a cloud backup.
- Existing historical cloud backups must remain untouched.
- Restoration from a different application version is not supported.
- If the selected backup is incompatible or invalid, the current library must remain untouched.

The protective Excel export is a separate, user-managed recovery copy. It must not be uploaded automatically to a backup provider.

## 10. Provider disconnection and deletion

Disconnecting a provider:

- Stops future backups to that provider.
- Does not delete existing backup files.
- Does not affect backups stored with other providers.
- Must allow the user to reconnect the same account later and regain access to its existing backup history, where supported by the provider.

Users must be able to:
- Delete individual backups.
- Delete all backups belonging to a provider.
- Manage their files directly through the provider if they wish.

Deletion requires explicit confirmation.

## 11. Backup Management interface

Digital Library must provide a dedicated Backup Management section.

Minimum functionality:

- View configured providers and their connection status.
- View the latest backup date and result for each provider.
- Inspect the five retained backups for each provider.
- View backup validation status.
- See whether automatic backups are active or suspended.
- Create a manual backup.
- Restore a backup.
- Download a backup.
- Delete individual backups or all backups belonging to a provider.
- Connect and disconnect providers.

The interface must clearly communicate partial failures, suspended automatic backups and required user actions.

## 12. Initial setup

- Cloud backup is optional during initial application setup.
- Users may start using Digital Library without configuring a backup provider.
- Manual Excel export remains available.
- Users can configure one or more providers later.
- The application must clearly indicate when cloud backups are not configured or active.

## 13. Technical constraints and dependencies

The implementation must respect these existing decisions:

- **DL-2:** Environment separation between production and test.
- **DL-3:** Local-first architecture, IndexedDB as the primary database, and manual user-controlled synchronisation.
- **DL-4:** Preserve the original R1 data and independent backup during migration.
- **DL-7:** Release and promotion strategy remains the responsibility of the release-strategy decision.
- **DL-14:** Synchronisation behaviour remains the responsibility of the synchronisation decision.

DL-5 defines backup protection around these operations; it does not redesign their underlying processes.

## 14. Open technical feasibility questions

The following questions remain open and must be investigated before implementation choices are finalised:

1. **Google Drive:** Does Google's current API policy permit the intended automatic backup integration, and what permissions and consent are required?
2. **Cloudflare R2:** What is the simplest secure architecture for each user to own and manage their own R2 storage and Worker?
3. **Provider authentication:** How can credentials and access permissions be managed securely without exposing permanent secrets in the PWA?
4. **Provider capabilities:** Can each provider support the required file listing, download, upload, deletion and retention operations?
5. **Provider onboarding:** What setup instructions and user experience are required for each provider?

These are technical feasibility checks, not approved changes to the requirements.

## 15. Items deliberately deferred

The following are not decided in DL-5:

- The R2 data model and native backup contents.
- Exact native backup file format.
- Exact numerical thresholds for bulk deletion.
- Detailed provider authentication implementation.
- Detailed cloud-provider onboarding screens.
- Cross-version restoration is explicitly unsupported and is not a deferred requirement.
- Exact technical implementation of backup integrity and restoration-readiness checks.
- Release and branch promotion rules.
- Synchronisation implementation details.

These should be addressed in their respective decisions or implementation design stages.

## 16. Summary

Digital Library R2 will use a user-owned, provider-independent backup architecture.

The core principles are:

- Complete, independently restorable native backups.
- Optional multiple cloud providers.
- Five valid backups retained per provider.
- Automatic backups before risky operations, plus manual backups on demand.
- Independent provider histories.
- Explicit reporting and handling of provider failures.
- Private provider-managed storage security.
- Protective Excel export before restoration.
- User control over backup management and deletion.
- No scheduled backups, incremental backups or application-level encryption.

Reliability and recoverability take priority over sophisticated backup mechanisms or unnecessary implementation complexity.
