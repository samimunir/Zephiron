use anyhow::Result;
use clap::{Parser, Subcommand};
use serde::{Deserialize, Serialize};
use std::{
    fs,
    path::{Path, PathBuf},
};

// job_tracker_cli: track your job applications locally.
#[derive(Parser, Debug)]
#[command(name = "job_tracker_cli", version, about = "Track your job applications locally")]
struct Cli {
    // Path to the JSON database file.
    #[arg(short, long, default_value = "joblog.json")]
    db: PathBuf,

    // Subcommand to run
    #[command(subcommand)]
    cmd: Command,
}

#[derive(Subcommand, Debug)]
enum Command {
    // Add a new application.
    Add {
        // Job title.
        title: String,
        // Company name,
        company: String,
    },

    // List all applications
    List,

    // Mark an application as a status (default: Closed). e.g. "done 3 Interview"
    Done {
        // Record ID
        id: usize,
        // New status (Closed | Interview | Open). Defaults to Closed.
        #[arg(default_value = "Closed")]
        status: String,
    },

    // Remove an application by ID
    Remove {
        // Record ID
        id: usize,
    },
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct Record {
    id: usize,
    title: String,
    company: String,
    status: Status,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
enum Status {
    Open,
    Interview,
    Closed,
}

// Simple String -> Status mapper
impl From<String> for Status {
    fn from(s: String) -> Self {
        match s.to_lowercase().as_str() {
            "interview" => Status::Interview,
            "closed" => Status::Closed,
            _ => Status::Open,
        }
    }
}

fn main() -> Result<()> {
    let cli = Cli::parse();

    let mut items = load_db(&cli.db)?;

    match cli.cmd {
        Command::Add {title, company} => {
            let next_id = items.iter().map(|r| r.id).max().unwrap_or(0) + 1;
            
            items.push(Record {
                id: next_id,
                title,
                company,
                status: Status::Open,
            });

            save_db(&cli.db, &items)?;

            println!("Added application #{next_id}");
        }
        Command::List => {
            println!("(placeholder) Would list items from {:?}", cli.db);
        }
        Command::Done {id, status} => {
            println!("(placeholder) Would mark #{id} as {status}");
        }
        Command::Remove {id} => {
            println!("(placeholder) Would remove #{id}");
        }
    }

    Ok(())
}

// Read JSON database
fn load_db(path: &Path) -> Result<Vec<Record>> {
    if !path.exists() {
        return Ok(vec![]);
    }

    let data = fs::read_to_string(path)?;
    let items: Vec<Record> = serde_json::from_str(&data)?;

    Ok(items)
}

// Write whole DB back to disk
fn save_db(path: &Path, items: &Vec<Record>) -> Result<()> {
    let data = serde_json::to_string_pretty(items)?;
    fs::write(path, data)?;
    Ok(())
}

fn pretty(s: &Status) -> &'static str {
    match s {
        Status::Open => "Open",
        Status::Interview => "Interview",
        Status::Closed => "Closed",
    }
}