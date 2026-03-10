## Git workflow cheatsheet (team-friendly)

This repo uses a **branch-based workflow**: each feature/fix lives on its own branch, then is merged into `main` via pull request.

### 1. First-time setup

```bash
# Clone the repo
git clone <repo-url>
cd mcgeorge-website

# Set your name/email (once per machine)
git config user.name "Your Name"
git config user.email "you@example.com"
```

### 2. Keeping your local `main` up to date

```bash
# Make sure you're on main
git checkout main

# Download latest changes and update your local main
git pull origin main
```

Do this **before starting any new work**.

### 3. Creating and using feature branches

```bash
# Start a new branch from the latest main
git checkout main
git pull origin main
git checkout -b feature/short-description

# See which files changed
git status

# Stage and commit your work
git add path/to/file1 path/to/file2
git commit -m "Describe what and why, briefly"

# Push branch to GitHub
git push -u origin feature/short-description
```

After the first push, you can just run:

```bash
git push
```

### 4. Keeping your branch in sync with `main`

Do this regularly to reduce conflicts:

```bash
git checkout main
git pull origin main          # update local main

git checkout feature/short-description
git merge main                # OR: git rebase main (team preference)
```

If there are conflicts:

1. Git will mark conflicting files.
2. Open each file, fix the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`).
3. Then:

```bash
git add path/to/conflicted-file
git commit                    # completes merge
```

### 5. Seeing what changed

```bash
# Changes not yet staged
git diff

# Changes that are staged
git diff --cached

# Compare your branch with main
git diff main...HEAD

# Short history
git log --oneline --graph --decorate --all
```

### 6. Pulling latest changes on your branch

If someone else pushed to the same branch (or you worked from another machine):

```bash
git checkout feature/short-description
git pull                      # fetch + merge remote changes into your branch
```

Resolve conflicts if prompted (same steps as above).

### 7. Stashing work in progress

Use stash when you need to switch branches but are not ready to commit:

```bash
git stash                      # save current changes
git checkout main              # or another branch

# Later, back on your branch:
git checkout feature/short-description
git stash pop                  # re-apply stashed changes
```

### 8. Cleaning up local branches

After a feature branch has been merged and you no longer need it:

```bash
# Delete local branch
git branch -d feature/short-description

# Delete remote branch
git push origin --delete feature/short-description
```

### 9. Quick conflict-avoidance checklist

- **Always**: `git checkout main && git pull origin main` before starting work.
- **Always**: create a new branch off the latest `main`.
- **Often**: merge `main` into your branch while you work.
- **Never**: commit directly to `main` (except for very small, agreed changes).
- **Ask for help** if a conflict looks confusing rather than guessing.

